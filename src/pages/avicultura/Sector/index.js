import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiPower } from 'react-icons/fi';
import { useHistory } from 'react-router-dom'
import './styles.css';

import api from '../../../services/api';

export default function Sector() {
    const [galpao, setGalpao] = useState('');
    const [lote, setLote] = useState('');
    const [linhagem, setLinhagem] = useState('');
    const [idade, setIdade] = useState(0);
    const [nutrição, setNutricao] = useState('');
    const [numero_de_aves, setAves] = useState(0);
    const token = sessionStorage.getItem('token');
    const history = useHistory();

    async function handleSector(event) {
        event.preventDefault();
        const data = {
            linhagem,
            idade,
            nutrição,
            numero_de_aves,
            galpao,
            lote_id: lote
        }
        try {
            api.post('/setor-lote', data, {
                headers: {
                    Authorization: token,
                }
            }).then(response => {
                alert("Lote criado com Sucesso!")
                setGalpao('');
                setLote('');
                setLinhagem('');
                setIdade(0);
                setNutricao('');
                setAves(0);
            })
        }
        catch (error) {
            alert('Algo deu errado,tente novamente')
        }
    }
    function logoff() {
        localStorage.clear();
        sessionStorage.clear();
        history.push('/');
    }
    useEffect(() => {
        document.title = "Cadastro de Lote - Avicultura"
    }, []);
    return (
        <div className="section-container">
            <div className="content">
                <header>
                    <h2>Cadastro de Lote</h2>
                    <button onClick={logoff}>
                        <FiPower color={'#fff'} size={20} />
                    </button>
                </header>
                <div className="container">
                    <form onSubmit={handleSector} id="sector_form">
                        <div className="input-group">
                            <div className="input">
                                <h4>Galpão</h4>
                                <input type="number"
                                    value={galpao}
                                    onChange={e => setGalpao(e.target.value)}
                                />
                            </div>
                            <div className="input">
                                <h4>Lote</h4>
                                <input type="number"
                                    value={lote}
                                    onChange={e => setLote(e.target.value)}
                                />
                            </div>
                            <div className="input">
                                <h4>Linhagem</h4>
                                <input type="text"
                                    value={linhagem}
                                    onChange={e => setLinhagem(e.target.value)}
                                />
                            </div>
                            <div className="input">
                                <h4>Idade das Aves</h4>
                                <div className="label">
                                    <input type="number"
                                        value={idade}
                                        onChange={e => setIdade(e.target.value)}
                                    />
                                    <p>Semanas</p>
                                </div>
                            </div>
                            <div className="input">
                                <h4>Nutrição</h4>
                                <input type="text"
                                    value={nutrição}
                                    onChange={e => setNutricao(e.target.value)}
                                />
                            </div>
                            <div className="input">
                                <h4>Número de Aves</h4>
                                <input type="number"
                                    value={numero_de_aves}
                                    onChange={e => setAves(e.target.value)}
                                />
                            </div>
                        </div>
                    </form>
                </div>
                <button type="submit" form="sector_form">
                    Cadastrar
                    <FiChevronRight size={20} />
                </button>
            </div>
        </div>
    )
}