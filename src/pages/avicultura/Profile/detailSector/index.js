import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { FiPower, FiArrowLeftCircle, FiRefreshCcw } from 'react-icons/fi';
import SectorSvg from '../../../../assets/sector_list_icon.svg';

import api from '../../../../services/api'

import './styles.css'

export default function DetailSector() {
    const loteId = new URLSearchParams(useLocation().search).get("lote");
    const granjaId = new URLSearchParams(useLocation().search).get("granja");
    const buttonSubmit = useRef(null);

    const [formChanges, setFormChanges] = useState([]);
    const [linhagem, setLinhagem] = useState('');
    const [idade, setIdade] = useState('');
    const [nutricao, setNutricao] = useState('');
    const [numAves, setNumAves] = useState('');
    const [galpao, setGalpao] = useState('');
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        document.title = "Perfil: Detalhe de Setor - Avicultura"
    }, []);

    useEffect(() => {
        async function getEgg() {
            try {
                const response = await api.get(`/perfil-lote/get-lote?lote=${loteId}&granja=${granjaId}`);

                setLinhagem(response.data.linhagem);
                setIdade(response.data.idade);
                setNutricao(response.data.nutrição);
                setNumAves(response.data.numero_de_aves);
                setGalpao(response.data.galpao);

            } catch (error) {
                alert("Algo inesperado aconteceu,tente novamente mais tarde");
            }
        }
        getEgg();
    }, [loteId, granjaId]);

    async function handleSubmit(event) {
        event.preventDefault();

        if (formChanges !== {}) {
            try {
                await api.put(`/perfil-lote/${loteId}`, formChanges, {
                    headers: {
                        Authorization: token,
                    }
                })
                alert('Lote atualizado com Sucesso!');
            } catch (error) {
                alert('Houve um problema ao atualizar o ovo,tente novamente mais tarde');
            }
        }
    }
    function handleFormChanges(event) {
        setFormChanges({ ...formChanges, [event.target.name]: event.target.value });

        buttonSubmit.current.disabled = false;
    }


    return (
        <div className="detail-lote-container">
            <div className="content">
                <header>
                    <div className="header-row">
                        <div>
                            <h2>Minha Granja</h2>
                            <h3>Detalhes do Lote</h3>
                        </div>
                        <button>
                            <FiPower color={'#fff'} size={20} />
                        </button>
                    </div>
                </header>
                <div className="container">
                    <form id="updateForm" onChange={handleFormChanges} onSubmit={handleSubmit} autoComplete="off">
                        <div className="header-row">
                            <div className="header-group">
                                <img src={SectorSvg} alt="Ovo" />
                                <div className="item">
                                    <h4>Código do Lote</h4>
                                    <p>0{loteId}</p>
                                </div>
                            </div>
                            <div>
                                <Link to="/profile/list-sector/1">
                                    <FiArrowLeftCircle size={20} color={'#11ADE8'} />
                        Voltar para a Listagem
                    </Link>
                            </div>
                        </div>
                        <div className="input-group">
                            <div className="input">
                                <h4>Linhagem</h4>
                                <div className="label">
                                    <input type="text"
                                        name="linhagem"
                                        value={linhagem}
                                        onChange={e => setLinhagem(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="input">
                                <h4>Idade</h4>
                                <div className="label">
                                    <input type="number"
                                        name="idade"
                                        value={idade}
                                        onChange={e => setIdade(e.target.value)}
                                    />
                                    <p>Semanas</p>
                                </div>
                            </div>
                            <div className="input">
                                <h4>Nutrição</h4>
                                <div className="label">
                                    <input type="text"
                                        name="nutrição"
                                        value={nutricao}
                                        onChange={e => setNutricao(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="input">
                                <h4>Número de Aves</h4>
                                <div className="label">
                                    <input type="number"
                                        name="numero_de_aves"
                                        value={numAves}
                                        onChange={e => setNumAves(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="input">
                                <h4>Galpão</h4>
                                <div className="label">
                                    <input type="text"
                                        name="galpao"
                                        value={galpao}
                                        onChange={e => setGalpao(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <button ref={buttonSubmit} type="submit" form="updateForm" disabled>
                    Atualizar
                    <FiRefreshCcw size={20} />
                </button>
            </div>
        </div>
    )
}