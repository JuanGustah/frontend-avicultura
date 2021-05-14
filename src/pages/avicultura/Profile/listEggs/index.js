import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'

import { FiPower, FiArrowLeftCircle } from 'react-icons/fi';
import Egg from '../../../../assets/egg_list.svg';
import './styles.css';

import Paginator from '../../../../components/paginator';

import api from '../../../../services/api';
export default function ListEggs() {
    let { search } = useLocation();

    const query = new URLSearchParams(search);
    const sessionId = query.get('session');
    const history = useHistory();

    const [sessionDate, setSessionDate] = useState('');
    const page = query.get('page');
    const [eggPages, setEggPages] = useState(1);
    const [ovosCadastrados, setOvosCadastrados] = useState([]);

    const token = sessionStorage.getItem('token');

    useEffect(() => {
        document.title = "Perfil: Listagem de Ovos - Avicultura"
    }, []);

    useEffect(() => {
        api.get(`egg-session/get-eggs?sessionid=${sessionId}&page=${page}`, {
            headers: {
                Authorization: token,
            }
        }).then(response => {
            setOvosCadastrados(response.data.eggData);
            setEggPages(response.data.pages);
        })
    }, [token])
    useEffect(() => {
        api.get(`/egg-session/get-session/${sessionId}`, {
            headers: {
                Authorization: token,
            }
        }).then(response => {
            setSessionDate(response.data.sessionData.created_at);
        })
    }, [token])
    function logoff() {
        localStorage.clear();
        sessionStorage.clear();
        history.push('/');
    }
    return (
        <div className="listeggs-container">
            <div className="content">
                <header>
                    <div className="header-row">
                        <div>
                            <h2>Listagem de Ovos</h2>
                        </div>
                        <button onClick={logoff}>
                            <FiPower color={'#fff'} size={20} />
                        </button>
                    </div>
                </header>
                <div className="container">
                    <div className="header-row">
                        <h3>Ovos da inserção do dia {new Date(sessionDate).toLocaleDateString()}</h3>
                        <Link to={`/profile/listsessions/1`}>
                            <FiArrowLeftCircle size={20} color={'#11ADE8'} />
                                Voltar para a Listagem
                        </Link>
                    </div>
                    <div className="collection">
                        {ovosCadastrados.map(ovo => (
                            <div className="row" key={ovo.id}>
                                <div className="title">
                                    <img src={Egg} alt="Ovo Ícone" />
                                    <h4>Ovo {ovo.id}</h4>
                                </div>
                                <div className="button-group">
                                    <Link to={`/profile/detailegg?sessionID=${sessionId}&eggID=${ovo.id}`}>
                                        <b>Detalhes / Editar</b>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Paginator src={`/profile/listsessions?${sessionId}&page=`} pages={eggPages} page={page} />
                </div>
            </div>
        </div>
    )
}