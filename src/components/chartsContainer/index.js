import React, { useEffect, useState } from 'react';
import Chart from "react-google-charts";

import { FiTrendingUp, FiGrid } from 'react-icons/fi';
import Warning from '../../assets/warning.svg';
import './styles.css';
import api from '../../services/api';

export default function ChartsContainer() {
    const [options, setOptions] = useState([]);
    const [eggColumn, setEggColumn] = useState("pesoOvo");
    const [eggColumnName, setEggColumnName] = useState("Peso do Ovo");
    const [dateType, setDateType] = useState("week");
    const [chartType, setChartType] = useState("LineChart");
    const [chartData, setChartData] = useState([]);
    const [chartGenerateTimes, setChartGenerateTimes] = useState(0);
    const [isChartDataEmpty, setIsChartDataEmpty] = useState(false);

    var tempChartData = [];
    var chartTypes = [{ name: "Gráfico em Linha", type: "LineChart" },
    { name: "Gráfico de Barra", type: "ColumnChart" },
    { name: "Gráfico de Pizza", type: "PieChart" },
    { name: "Gráfico Escalonado", type: "SteppedAreaChart" },
    { name: "Tabela", type: "Table" },]
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        api.get('/dashboard/populateselect').then(response => {
            setOptions(response.data);
        });
    }, [])
    useEffect(() => {
        options.map(opt => {
            if (opt.column === eggColumn) {
                setEggColumnName(opt.name);
            }
        })
    }, [chartGenerateTimes]);

    async function handleChartForm(event) {
        event.preventDefault();

        const data = {
            dateType,
            eggColumn
        }

        const response = await api.post('/dashboard/chartdata', data, {
            headers: {
                'Authorization': token,
            }
        })

        if (response.data.chartRowData) {
            setChartGenerateTimes(chartGenerateTimes + 1);

            generateChartArray(response.data.chartRowData);

            setIsChartDataEmpty(false);
        } else if (response.data.error) {
            setIsChartDataEmpty(true);
        }
    }
    function generateChartArray(responseArray) {
        responseArray.map(data => {
            const dataRow = [data.dateChart, data.avg];
            tempChartData.push(dataRow);
        })
        setChartData(tempChartData);
    }
    return (
        <div className="charts-container">
            <h2>Progresso dos Ovos</h2>
            <div className="box">
                <form onSubmit={handleChartForm}>
                    <input type="radio" name="dateType" id="dateTypeWeek"
                        value="week"
                        onChange={e => setDateType(e.target.value)}
                        checked={dateType === "week"}
                    />
                    <label htmlFor="dateTypeWeek">Semana</label>
                    <input type="radio" name="dateType" id="dateTypeYear"
                        value="year"
                        onChange={e => setDateType(e.target.value)}
                        checked={dateType === "year"}
                    />
                    <label htmlFor="dateTypeYear">Ano</label>
                    <select onChange={e => setEggColumn(e.target.value)}>
                        {options.map((opt, index) => (
                            <option key={index} value={opt.column}>{opt.name}</option>
                        ))}
                    </select>
                    <button>
                        Gerar
                        <FiTrendingUp color={'#fff'} size={15} />
                    </button>
                </form>
                {chartData.length !== 0 ?
                    <div className="chart-options">
                        <FiGrid color={'#1976D2'} size={15} />
                        <select onChange={e => setChartType(e.target.value)}>
                            {chartTypes.map((opt, index) => (
                                <option key={index} value={opt.type}>{opt.name}</option>
                            ))}
                        </select>
                    </div>
                    : null
                }
                {chartData.length !== 0 ?
                    <Chart
                        width={'600px'}
                        height={'400px'}
                        chartType={chartType}
                        loader={<div>Loading Chart</div>}
                        data={[
                            [
                                { type: 'string', label: 'Dia' },
                                eggColumnName,
                            ],
                            ...chartData
                        ]}
                        options={
                            {
                                hAxis: {
                                    title: "Data",
                                },
                                vAxis: {
                                    title: `Média de ${eggColumnName}`,
                                },
                                pointSize: 8,
                                series: {
                                    0: { curveType: 'function' },
                                },
                                animation: {
                                    startup: true,
                                    easing: 'out',
                                    duration: 870,
                                },
                                chartArea: {
                                    top: 20,
                                    bottom: 80,
                                },
                                trendlines: {
                                    0: {
                                        type: 'exponential',
                                        visibleInLegend: true,
                                    },
                                },
                                allowHtml: true,
                                cssClassNames: {
                                    headerRow: "header",
                                    tableCell: 'cell'
                                }
                            }
                        }
                        rootProps={{ 'data-testid': '1' }}
                    />
                    :
                    null
                }
                {isChartDataEmpty ?
                    <div className="empty">
                        <img src={Warning} alt="vazio" />
                        <p>Você não inseriu nenhum ovo ainda!</p>
                    </div>
                    : null
                }
            </div>
        </div>
    )
}