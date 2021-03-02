import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../../../services/api'

import './styles.css';
import eggBox from '../../../../assets/egg_box.svg';
import eggOpen from '../../../../assets/egg_open.svg';
import { FiChevronRight, FiPower } from 'react-icons/fi';

export default function EggForm() {
    const history = useHistory();
    const [loteOvos, setLoteOvos] = useState([]);
    const [loteEscolhido, setLoteEscolhido] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [quantityEmpty, setquantityEmpty] = useState(false);
    const [insert, setInsert] = useState('componentes');
    const token = sessionStorage.getItem('token');

    function logoff() {
        localStorage.clear();
        sessionStorage.clear();
        history.push('/');
    }

    useEffect(() => {
        api.get('/perfil-lote', {
            headers: {
                Authorization: token,
            }
        }).then(response => {
            setLoteOvos(response.data)
        })
    }, [token])

    async function handleEggForm(event) {
        event.preventDefault();

        const data = {
            lote: loteEscolhido,
            egg_qt: quantity,
            insection_way: insert
        }
        try {
            const response = await api.post('/egg-session', data, {
                headers: {
                    'Authorization': token,
                }
            });
            sessionStorage.setItem('sessionId', response.data.id);

            if (!quantityEmpty)
                sessionStorage.setItem('eggQuantity', quantity)
            else
                sessionStorage.setItem('quantityFixed', false);

            history.push('/egg/albumen');
        }
        catch (error) {
            alert('Não foi possível concluir a operação,tente novamente')
        }

    }


    return (
        <div className="egg-container">
            <div className="content">
                <header>
                    <div>
                        <h2>Cadastro de ovo</h2>
                    </div>
                    <button onClick={logoff}>
                        <FiPower color={'#000'} size={20} />
                    </button>
                </header>
                <div className="container">
                    <form onSubmit={handleEggForm}>
                        <div className="input-group">
                            <div className="input">
                                <h4>Setor dos ovos</h4>
                                <select onChange={e => setLoteEscolhido(e.target.value)} value={loteEscolhido}>
                                    <option value="" disabled>Escolha um Lote</option>
                                    {loteOvos.map(lote => (
                                        <option value={lote.lote_id} key={lote.lote_id}>Lote {lote.lote_id}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="quantity">
                                <h4>Quantidade de ovos</h4>
                                <button type="button" onClick={e => quantity !== 0 ? setQuantity(quantity * 1 - 1) : null}>-</button>
                                <input type="number"
                                    value={quantity}
                                    onChange={e => setQuantity(e.target.value)}
                                    min="0" />
                                <button type="button" onClick={e => setQuantity(quantity * 1 + 1)}>+</button>
                                <div className="checkbox">
                                    <input type="checkbox" id="empty" value={quantityEmpty} onChange={e => setquantityEmpty(e.target.value)} />
                                    <span>Não possuo esse valor</span>
                                </div>
                            </div>
                        </div>
                        <div className="input-buttons">
                            <h4>Forma de inserção</h4>
                            <div style={{ display: "flex" }}>
                                <input type="radio" name="type" id="componente" checked={insert === 'componentes'} value="componentes" onChange={e => setInsert(e.target.value)} />
                                <label htmlFor="componente">
                                    <img src={eggOpen} alt="" />
                                    <p>Por Componentes</p>
                                </label>
                                <input type="radio" name="type" id="ovo" checked={insert === 'ovos'} value="ovos" onChange={e => setInsert(e.target.value)} />
                                <label htmlFor="ovo">
                                    <img src={eggBox} alt="" />
                                    <p>Por ovos</p>
                                </label>
                            </div>
                        </div>
                        <button className="submit">
                            Prosseguir
                            <FiChevronRight size={20} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}