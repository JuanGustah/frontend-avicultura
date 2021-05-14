import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { FiPower, FiArrowLeftCircle } from 'react-icons/fi';
import Egg from '../../../../assets/egg_list.svg';
import './styles.css';

import Paginator from '../../../../components/paginator';

import api from '../../../../services/api';
export default function ListSessionsEggs() {
    const { page } = useParams();
    const [sessionPages, setSessionPages] = useState(1);
    const [eggSessions, setEggSessions] = useState([]);
    const history = useHistory();
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        api.get("/egg-session/getgranjasessions", {
            headers: {
                Authorization: token,
            }
        }).then(response => {
            setEggSessions(response.data.sessionData);
            setSessionPages(response.data.pages);
        })

    }, [token])
    useEffect(() => {
        document.title = "Perfil: Listagem de Inserções - Avicultura"
    }, []);
    function logoff() {
        localStorage.clear();
        sessionStorage.clear();
        history.push('/');
    }
    return (
        <div className="sessions-container">
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
                        <h3>Histórico de Inserções</h3>
                        <Link to={`/profile`}>
                            <FiArrowLeftCircle size={20} color={'#11ADE8'} />
                                Voltar para o perfil
                        </Link>
                    </div>
                    <div className="collection">
                        {eggSessions.map(session => (
                            <div className="row" key={session.id}>
                                <div className="title">
                                    <img src={Egg} alt="Ovo Ícone" />
                                    <div className="info-box">
                                        <h4>Inserção dia {new Date(session.created_at).toLocaleDateString()}</h4>
                                        <div className="info-row">
                                            <h5>Lote {session.lote}</h5>
                                            <h5>{session.egg_qt} ovos</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="button-group">
                                    <Link to={`/profile/listeggs?session=${session.id}&page=1`}>
                                        <b>Ver Ovos</b>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Paginator src="/profile/listsessions/" pages={sessionPages} page={page} />
                </div>
            </div>
        </div>
    )
}