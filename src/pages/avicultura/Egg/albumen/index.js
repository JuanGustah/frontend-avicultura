import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiChevronRight, FiPower, FiEye } from 'react-icons/fi';

import api from '../../../../services/api'
import './styles.css'

export default function Albumen() {
    const [pesoOvo, setPesoOvo] = useState('');
    const [alturaAlbumen, setAlturaAlbumen] = useState('');
    const [diametroAlbumen, setDiametroAlbumen] = useState('');
    const [insertType, setInsertType] = useState('');
    const [eggIndex, setEggIndex] = useState(1);
    const [lote, setLote] = useState('');
    const [albumenEmpty, setAlbumenEmpty] = useState(false);


    const eggQuantity = sessionStorage.getItem('eggQuantity');
    const sessionId = sessionStorage.getItem('sessionId');
    const token = sessionStorage.getItem('token');
    const quantityFixed = sessionStorage.getItem('quantityFixed');

    const history = useHistory();

    function logoff() {
        localStorage.clear();
        sessionStorage.clear();
        history.push('/');
    }
    useEffect(() => {
        document.title = "Cadastro de Ovos: Albúmen - Avicultura"
    }, []);

    function viewEggInserted() {
        sessionStorage.setItem('eggIndex', eggIndex);
        sessionStorage.setItem('insertType', insertType);
        sessionStorage.setItem('component', 'albumen');
        sessionStorage.setItem('nextRoute', 'albumen');
        history.push('/egg/revisar/1');
    }

    useEffect(() => {
        if (sessionId === null) {
            alert('É necessário escolher os dados de entrada!');
            history.push('/egg')
        } else {
            async function setUpAlbumen() {
                try {
                    const { data } = await api.get(`/egg-session/get-session/${sessionId}`, {
                        headers: {
                            Authorization: token,
                        }
                    });

                    setInsertType(data.sessionData.insection_way);
                    setLote(data.sessionData.lote);

                } catch (error) {
                    console.log(error);
                }
            }
            setUpAlbumen();
        }
    }, [token])

    useEffect(() => {
        if (sessionStorage.getItem('eggIndex') !== null && insertType === "componentes" && eggQuantity !== null) {
            setEggIndex(sessionStorage.getItem('eggIndex'));
            sessionStorage.removeItem('eggIndex');

        } else {
            if (sessionStorage.getItem('eggIndex') && eggQuantity === null && insertType === "componentes") {
                setEggIndex(sessionStorage.getItem('eggIndex') * 1 + 1);
                sessionStorage.removeItem('eggIndex');
            } else {
                if (insertType === "ovos") {
                    setEggIndex(sessionStorage.getItem('eggIndex') * 1 + 1);
                    sessionStorage.removeItem('eggIndex');
                }
            }
        }

    }, [insertType])
    async function HandleAlbumen(event) {
        event.preventDefault();

        if (pesoOvo === '' && alturaAlbumen === '' && diametroAlbumen === '') {
            setAlbumenEmpty(true);
        }

        const data = {
            id: eggIndex,
            secao_id: sessionId,
            lote,
            pesoOvo,
            albumenEmpty,
            alturaAlbumen,
            diametroAlbumen
        }


        if (insertType === "componentes" && eggQuantity !== null) {
            if (parseInt(eggIndex, 10) === parseInt(eggQuantity, 10)) {

                try {
                    await api.post('/ovo', data, {
                        headers: {
                            Authorization: token,
                        }
                    })
                    sessionStorage.setItem('insertType', insertType);
                    sessionStorage.setItem('component', 'albumen');
                    sessionStorage.setItem('nextRoute', 'gema');
                    history.push('/egg/revisar/1');
                } catch (error) {
                    alert('Erro ao inserir albúmen! Por favor,tente novamente')
                }
            } else {
                try {
                    await api.post('/ovo', data, {
                        headers: {
                            Authorization: token,
                        }
                    })
                    setEggIndex(eggIndex * 1 + 1);
                    setPesoOvo('');
                    setDiametroAlbumen('');
                    setAlturaAlbumen('');
                } catch (error) {
                    alert('Erro ao inserir albúmen! Por favor,tente novamente')
                }
            }
        } else {
            if (insertType === "ovos") {
                try {
                    await api.post('/ovo', data, {
                        headers: {
                            Authorization: token,
                        }
                    })
                    sessionStorage.setItem('insertType', insertType);
                    sessionStorage.setItem('eggIndex', eggIndex);
                    history.push('/egg/gema');
                } catch (error) {
                    alert('Erro ao inserir albúmen! Por favor,tente novamente')
                }
            } else {
                try {
                    await api.post('/ovo', data, {
                        headers: {
                            Authorization: token,
                        }
                    })
                    sessionStorage.setItem('insertType', insertType);
                    sessionStorage.setItem('component', 'albumen');
                    sessionStorage.setItem('nextRoute', 'gema');
                    sessionStorage.setItem('eggIndex', eggIndex);

                    if (sessionStorage.getItem('afterInsection') !== null && sessionStorage.getItem('firstIndex') === null)
                        sessionStorage.setItem('firstIndex', eggIndex)

                    history.push('/egg/revisar/1');
                } catch (error) {
                    alert('Erro ao inserir albúmen! Por favor,tente novamente')
                }
            }
        }
    }
    return (
        <div className="albumen-container">
            <div className="content">
                <header>
                    <div className="header-row">
                        <div>
                            <h2>Cadastro de ovos</h2>
                            <h3>Albúmen</h3>
                        </div>
                        <button onClick={logoff}>
                            <FiPower color={'#000'} size={20} />
                        </button>
                    </div>
                    <div className="header-row">
                        {eggQuantity !== null && insertType === "componentes" ?
                            <h3>{eggIndex}/{eggQuantity}</h3> :
                            <h3>Ovo {eggIndex}</h3>
                        }
                    </div>
                </header>

                <div className="container">
                    <form onSubmit={HandleAlbumen} id="sector_form">
                        <div className="input-group">
                            <div className="input">
                                <h4>Peso do Ovo</h4>
                                <div className="label">
                                    <input type="number"
                                        value={pesoOvo}
                                        onChange={e => setPesoOvo(e.target.value)}
                                    />
                                    <p>Gramas</p>
                                </div>
                            </div>
                            <div className="input">
                                <h4>Altura do Albúmen</h4>
                                <div className="label">
                                    <input type="number"
                                        value={alturaAlbumen}
                                        onChange={e => setAlturaAlbumen(e.target.value)}
                                    />
                                    <p>Milímetros</p>
                                </div>
                            </div>
                            <div className="input">
                                <h4>Diâmetro do Albúmen</h4>
                                <div className="label">
                                    <input type="number"
                                        value={diametroAlbumen}
                                        onChange={e => setDiametroAlbumen(e.target.value)}
                                    />
                                    <p>Milímetros</p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <button type="submit" form="sector_form">
                    {eggQuantity && parseInt(eggIndex, 10) === parseInt(eggQuantity, 10) ? 'Finalizar' : 'Inserir'}
                    <FiChevronRight size={20} />
                </button>
                {eggIndex > 1 && insertType === "componentes" && quantityFixed === null ?
                    <button type="button" onClick={viewEggInserted}>
                        Visualizar
                        <FiEye size={20} />
                    </button>
                    : null
                }
            </div>
        </div>
    )
}