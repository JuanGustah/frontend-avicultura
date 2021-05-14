import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiChevronRight, FiPower, FiEye } from 'react-icons/fi';
import api from '../../../../services/api'

import './styles.css'

export default function Casca() {
    const [eggIndex, setEggIndex] = useState(1);
    const [pesoCasca, setPesoCasca] = useState('');
    const [espessuraP1, setEspessuraP1] = useState('');
    const [espessuraP2, setEspessuraP2] = useState('');
    const [espessuraP3, setEspessuraP3] = useState('');
    const [corCasca, setCorCasca] = useState('');
    const [cascaEmpty, setCascaEmpty] = useState(false);

    const sessionId = sessionStorage.getItem('sessionId');
    const insertType = sessionStorage.getItem('insertType');
    const eggQuantity = sessionStorage.getItem('eggQuantity');
    const tokenJwt = sessionStorage.getItem('token');
    const quantityFixed = sessionStorage.getItem('quantityFixed');

    const history = useHistory();

    useEffect(() => {
        document.title = "Cadastro de Ovos: Casca - Avicultura"
    }, []);

    useEffect(() => {
        if (sessionStorage.getItem('eggIndex') !== null && quantityFixed === null) {
            setEggIndex(sessionStorage.getItem('eggIndex'));
        } else {
            if (sessionStorage.getItem('eggIndex') !== null && sessionStorage.getItem('component') === sessionStorage.getItem('nextRoute')) {
                setEggIndex(sessionStorage.getItem('eggIndex'));
            } else {
                if (sessionStorage.getItem('afterInsection') !== null) {
                    setEggIndex(sessionStorage.getItem('firstIndex'));
                }
            }
        }
        sessionStorage.removeItem('component');
        sessionStorage.removeItem('eggIndex');
        sessionStorage.removeItem('nextRoute');
    }, [tokenJwt])

    async function handleCasca(event) {
        event.preventDefault();

        if (pesoCasca === '' && corCasca === '' && espessuraP1 === '' && espessuraP2 === '' && espessuraP3 === '') {
            setCascaEmpty(true);
        }

        const data = {
            cascaEmpty,
            pesoCasca,
            espessuraP1,
            espessuraP2,
            espessuraP3,
            corCasca
        }
        if (insertType === "componentes") {
            if (parseInt(eggIndex, 10) === parseInt(eggQuantity, 10) && quantityFixed === null) {
                try {
                    await api.put(`/perfil-ovos/${eggIndex}`, data, {
                        headers: {
                            Authorization: sessionId,
                        }
                    })
                    sessionStorage.setItem('insertType', insertType);
                    sessionStorage.setItem('component', 'Ovo');
                    sessionStorage.setItem('nextRoute', 'finalizar');
                    history.push('/egg/revisar/1')
                } catch (error) {
                    alert('Erro ao inserir casca! Por favor,tente novamente')
                }
            } else {
                if (parseInt(eggIndex, 10) === parseInt(eggQuantity, 10) && quantityFixed === 'false') {
                    try {
                        await api.put(`/perfil-ovos/${eggIndex}`, data, {
                            headers: {
                                Authorization: sessionId,
                            }
                        })
                        sessionStorage.setItem('insertType', insertType);
                        sessionStorage.setItem('component', 'Ovo');
                        sessionStorage.setItem('nextRoute', 'finalizar');
                        sessionStorage.setItem('eggIndex', sessionStorage.getItem('eggQuantity'));
                        sessionStorage.removeItem('eggQuantity');
                        sessionStorage.removeItem('firstIndex');
                        history.push('/egg/revisar/1');
                    } catch (error) {
                        alert('Erro ao inserir casca! Por favor,tente novamente')
                    }
                } else {
                    try {
                        await api.put(`/perfil-ovos/${eggIndex}`, data, {
                            headers: {
                                Authorization: sessionId,
                            }
                        })
                        setEggIndex(eggIndex * 1 + 1);
                        setPesoCasca('');
                        setEspessuraP1('');
                        setEspessuraP2('');
                        setEspessuraP3('');
                        setCorCasca('');
                    } catch (error) {
                        alert('Erro ao inserir casca! Por favor,tente novamente')
                    }
                }
            }
        } else {
            try {
                await api.put(`/perfil-ovos/${eggIndex}`, data, {
                    headers: {
                        Authorization: sessionId,
                    }
                })
                sessionStorage.setItem('insertType', insertType);
                sessionStorage.setItem('component', 'Ovo');
                sessionStorage.setItem('eggIndex', eggIndex);
                history.push('/egg/revisar/1');
            } catch (error) {
                alert('Erro ao inserir casca! Por favor,tente novamente')
            }
        }
    }
    function logoff() {
        localStorage.clear();
        sessionStorage.clear();
        history.push('/');
    }
    function viewEggInserted() {
        sessionStorage.setItem('eggIndex', eggIndex);
        sessionStorage.setItem('component', 'casca');
        sessionStorage.setItem('nextRoute', 'casca');
        history.push('/egg/revisar/1');
    }

    return (
        <div className="casca-container">
            <div className="content">
                <header>
                    <div className="header-row">
                        <div>
                            <h2>Cadastro de ovos</h2>
                            <h3>Casca</h3>
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
                    <form onSubmit={handleCasca} id="sector_form">
                        <div className="input-group">
                            <div className="input">
                                <h4>Peso da Casca</h4>
                                <div className="label">
                                    <input type="number"
                                        value={pesoCasca}
                                        onChange={e => setPesoCasca(e.target.value)}
                                    />
                                    <p>Gramas</p>
                                </div>
                            </div>
                            <div className="input">
                                <h4>Espessura da casca</h4>
                                <div className="label">
                                    <input type="number"
                                        value={espessuraP1}
                                        onChange={e => setEspessuraP1(e.target.value)}
                                    />
                                    <p>Ponto 1</p>
                                </div>
                                <div className="label">
                                    <input type="number"
                                        value={espessuraP2}
                                        onChange={e => setEspessuraP2(e.target.value)}
                                    />
                                    <p>Ponto 2</p>
                                </div>
                                <div className="label">
                                    <input type="number"
                                        value={espessuraP3}
                                        onChange={e => setEspessuraP3(e.target.value)}
                                    />
                                    <p>Ponto 3</p>
                                </div>
                            </div>
                            <div className="input">
                                <h4>Cor da Casca</h4>
                                <div className="label">
                                    <input type="number"
                                        value={corCasca}
                                        onChange={e => setCorCasca(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <button type="submit" form="sector_form">
                    {eggQuantity && parseInt(eggIndex, 10) === parseInt(eggQuantity, 10) ? 'Finalizar' : 'Inserir'}
                    <FiChevronRight size={20} />
                </button>
                {eggIndex > 1 && insertType === "componentes" ?
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