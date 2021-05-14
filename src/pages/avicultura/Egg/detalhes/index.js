import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { FiPower, FiArrowLeftCircle, FiRefreshCcw } from 'react-icons/fi';
import Egg from '../../../../assets/egg_list.svg';

import api from '../../../../services/api'

import './styles.css'

export default function Detalhes() {
    const eggID = new URLSearchParams(useLocation().search).get("id");
    const sessionID = new URLSearchParams(useLocation().search).get("session");
    const buttonSubmit = useRef(null);

    const [formChanges, setFormChanges] = useState([]);
    const [ovoID, setOvoID] = useState('');
    const [loteOvo, setLoteOvo] = useState('');
    const [pesoOvo, setPesoOvo] = useState('');
    const [albumenEmpty, setAlbumenEmpty] = useState('');
    const [porcentagemAlbumen, setPorcentagemAlbumen] = useState('');
    const [pesoAlbumen, setPesoAlbumen] = useState('');
    const [alturaAlbumen, setAlturaAlbumen] = useState('');
    const [diametroAlbumen, setDiametroAlbumen] = useState('');
    const [uniHaugh, setUniHaugh] = useState('');
    const [gemaEmpty, setGemaEmpty] = useState('');
    const [porcentagemGema, setPorcentagemGema] = useState('');
    const [pesoGema, setPesoGema] = useState('');
    const [corGema, setCorGema] = useState('');
    const [alturaGema, setAlturaGema] = useState('');
    const [diametroGema, setDiametroGema] = useState('');
    const [indiceGema, setIndiceGema] = useState('');
    const [cascaEmpty, setCascaEmpty] = useState('');
    const [porcentagemCasca, setPorcentagemCasca] = useState('');
    const [pesoCasca, setPesoCasca] = useState('');
    const [corCasca, setCorCasca] = useState('');
    const [espessuraP1, setEspessuraP1] = useState('');
    const [espessuraP2, setEspessuraP2] = useState('');
    const [espessuraP3, setEspessuraP3] = useState('');
    const [espessura, setEspessura] = useState('');

    useEffect(() => {
        document.title = "Cadastro de Ovos: Detalhes - Avicultura"
    }, []);

    useEffect(() => {
        async function getEgg() {
            try {
                const response = await api.get(`ovo?id=${eggID}&session=${sessionID}`);

                setOvoID(response.data.id);
                setLoteOvo(response.data.lote);
                setPesoOvo(response.data.pesoOvo);
                setAlbumenEmpty(response.data.albumenEmpty);
                setAlturaAlbumen(response.data.alturaAlbumen);
                setDiametroAlbumen(response.data.diametroAlbumen);
                setGemaEmpty(response.data.gemaEmpty);
                setPesoGema(response.data.pesoGema);
                setCorGema(response.data.corGema);
                setAlturaGema(response.data.alturaGema);
                setDiametroGema(response.data.diametroGema);
                setCascaEmpty(response.data.cascaEmpty);
                setPesoCasca(response.data.pesoCasca);
                setCorCasca(response.data.corCasca);
                setEspessuraP1(response.data.espessuraP1);
                setEspessuraP2(response.data.espessuraP2);
                setEspessuraP3(response.data.espessuraP3);


            } catch (error) {
                alert("Algo inesperado aconteceu,tente novamente mais tarde");
            }
        }
        getEgg();
    }, [eggID, sessionID]);

    useEffect(() => {
        if (pesoOvo && pesoCasca && pesoGema) {
            const AlbumenGramas = parseInt(pesoOvo, 10) - parseInt(pesoGema, 10) - parseInt(pesoCasca, 10)
            setPesoAlbumen(AlbumenGramas);
            setPorcentagemAlbumen(((AlbumenGramas * 100) / pesoOvo).toFixed(1))
        }
    }, [pesoOvo, pesoCasca, pesoGema])

    useEffect(() => {
        if (pesoOvo && pesoGema) {
            setPorcentagemGema(((pesoGema * 100) / pesoOvo).toFixed(1))
        }
    }, [pesoOvo, pesoGema])

    useEffect(() => {
        if (pesoOvo && pesoCasca) {
            setPorcentagemCasca(((pesoCasca * 100) / pesoOvo).toFixed(1))
        }
    }, [pesoOvo, pesoCasca])

    useEffect(() => {
        if (pesoOvo && alturaAlbumen) {
            setUniHaugh((100 * Math.log10(parseInt(pesoOvo, 10) + 7.57 - 1.7 * Math.pow(parseInt(alturaAlbumen, 10), 0.37))).toFixed(2));
        }

    }, [pesoOvo, alturaAlbumen])

    useEffect(() => {
        if (alturaGema && diametroGema) {
            setIndiceGema((parseInt(alturaGema, 10) / parseInt(diametroGema, 10)).toFixed(2));
        }

    }, [alturaGema, diametroGema])

    useEffect(() => {
        if (espessuraP1 && espessuraP2 && espessuraP3) {
            setEspessura((espessuraP1 * 1 + espessuraP2 * 1 + espessuraP3 * 1) / 3);
        }
    }, [espessuraP1, espessuraP2, espessuraP3])

    async function handleSubmit(event) {
        event.preventDefault();

        if (formChanges !== {}) {
            try {
                await api.put(`/perfil-ovos/${eggID}`, formChanges, {
                    headers: {
                        Authorization: sessionID,
                    }
                })
                alert('Ovo atualizado com Sucesso!');
            } catch (error) {
                alert('Houve um problema ao atualizar o ovo,tente novamente mais tarde');
            }
        }
    }
    function handleFormChanges(event) {
        setFormChanges({ ...formChanges, [event.target.name]: event.target.value });

        buttonSubmit.current.disabled = false;
    }
    function renderTables() {
        return (
            <div className="tables">
                <div className="row">
                    <h4>Detalhes do Albúmen</h4>
                    <table>
                        <thead>
                            <tr>
                                <th className="non-changeble">Porcentagem</th>
                                <th className="non-changeble">Peso</th>
                                <th className="non-changeble">Unidade Haugh</th>
                                <th>Altura</th>
                                <th>Diâmetro</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="non-changeble">
                                    {porcentagemAlbumen ?
                                        <label>
                                            {porcentagemAlbumen}
                                            <span>%</span>
                                        </label>
                                        :
                                        null
                                    }
                                </td>
                                <td className="non-changeble">
                                    {pesoAlbumen ?
                                        <label>
                                            {pesoAlbumen}
                                            <span>g</span>
                                        </label>
                                        :
                                        null
                                    }
                                </td>
                                <td className="non-changeble">
                                    <label>
                                        {uniHaugh}
                                    </label>
                                </td>
                                <td>
                                    <label>
                                        <input type="text" value={alturaAlbumen} onChange={e => setAlturaAlbumen(e.target.value)} name="alturaAlbumen"
                                            onInput={e => e.target.style.width = e.target.scrollWidth * 1 + 5 + 'px'} />
                                        <span>mm</span>
                                    </label>
                                </td>
                                <td>
                                    <label>
                                        <input type="text" value={diametroAlbumen} onChange={e => setDiametroAlbumen(e.target.value)} name="diametroAlbumen"
                                            onInput={e => e.target.style.width = e.target.scrollWidth * 1 + 5 + 'px'} />
                                        <span>mm</span>
                                    </label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {gemaEmpty !== null ? <div className="row">
                    <h4>Detalhes da Gema</h4>
                    <table>
                        <thead>
                            <tr>
                                <th className="non-changeble">Índice da gema</th>
                                <th className="non-changeble">Porcentagem</th>
                                <th>Peso</th>
                                <th>Cor</th>
                                <th>Altura</th>
                                <th>Diâmetro</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="non-changeble">
                                    <label>
                                        {indiceGema}
                                    </label>
                                </td>
                                <td className="non-changeble">
                                    {porcentagemGema ?
                                        <label>
                                            {porcentagemGema}
                                            <span>%</span>
                                        </label>
                                        :
                                        null
                                    }
                                </td>
                                <td>
                                    <label>
                                        <input type="text" value={pesoGema} onChange={e => setPesoGema(e.target.value)} name="pesoGema"
                                            onInput={e => e.target.style.width = e.target.scrollWidth * 1 + 5 + 'px'} />
                                        <span>g</span>
                                    </label>
                                </td>
                                <td>
                                    <label>
                                        <input type="text" value={corGema} onChange={e => setCorGema(e.target.value)} name="corGema"
                                            onInput={e => e.target.style.width = e.target.scrollWidth * 1 + 5 + 'px'} />
                                    </label>
                                </td>
                                <td>
                                    <label>
                                        <input type="text" value={alturaGema} onChange={e => setAlturaGema(e.target.value)} name="alturaGema"
                                            onInput={e => e.target.style.width = e.target.scrollWidth * 1 + 5 + 'px'} />
                                        <span>mm</span>
                                    </label>
                                </td>
                                <td>
                                    <label>
                                        <input type="text" value={diametroGema} onChange={e => setDiametroGema(e.target.value)} name="diametroGema"
                                            onInput={e => e.target.style.width = e.target.scrollWidth * 1 + 5 + 'px'} />
                                        <span>mm</span>
                                    </label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div> : null}
                {cascaEmpty !== null ? <div className="row">
                    <h4>Detalhes da Casca</h4>
                    <table>
                        <thead>
                            <tr>
                                <th className="non-changeble">Espessura</th>
                                <th className="non-changeble">Porcentagem</th>
                                <th>Peso</th>
                                <th>Cor</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="non-changeble">
                                    {espessura ?
                                        <label>
                                            {espessura}
                                            <span>mm</span>
                                        </label>
                                        :
                                        null
                                    }
                                </td>
                                <td className="non-changeble">
                                    {porcentagemCasca ?
                                        <label>
                                            {porcentagemCasca}
                                            <span>%</span>
                                        </label>
                                        :
                                        null
                                    }
                                </td>
                                <td>
                                    <label>
                                        <input type="text" value={pesoCasca} onChange={e => setPesoCasca(e.target.value)} name="pesoCasca"
                                            onInput={e => e.target.style.width = e.target.scrollWidth * 1 + 5 + 'px'} />
                                        <span>g</span>
                                    </label>
                                </td>
                                <td>
                                    <label>
                                        <input type="text" value={corCasca} onChange={e => setCorCasca(e.target.value)} name="corCasca"
                                            onInput={e => e.target.style.width = e.target.scrollWidth * 1 + 5 + 'px'} />
                                    </label>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div> : null}
            </div>
        )
    }


    return (
        <div className="details-container">
            <div className="content">
                <header>
                    <div className="header-row">
                        <div>
                            <h2>Cadastro de ovos</h2>
                            <h3>Detalhes do Ovo</h3>
                        </div>
                        <button>
                            <FiPower color={'#000'} size={20} />
                        </button>
                    </div>
                </header>
                <div className="container">
                    <form id="updateForm" onChange={handleFormChanges} onSubmit={handleSubmit} autoComplete="off">
                        <div className="header-row">
                            <div className="header-group">
                                <img src={Egg} alt="Ovo" />
                                <div className="item">
                                    <h4>Código do ovo</h4>
                                    <p>0{ovoID}</p>
                                </div>
                                <div className="item">
                                    <h4>Setor</h4>
                                    <p>0{loteOvo}</p>
                                </div>
                                <div className="item">
                                    <h4>Peso</h4>
                                    {pesoOvo ?
                                        <label>
                                            <input type="text" value={pesoOvo} onChange={e => setPesoOvo(e.target.value)} name="pesoOvo"
                                                onInput={e => e.target.style.width = e.target.scrollWidth * 1 + 5 + 'px'} />
                                            <span>g</span>
                                        </label>
                                        :
                                        <p>N/a</p>
                                    }

                                </div>
                            </div>
                            <div>
                                <Link to="/egg/revisar/1">
                                    <FiArrowLeftCircle size={20} color={'#F0A122'} />
                        Voltar para a Listagem
                    </Link>
                            </div>
                        </div>
                        {renderTables()}
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