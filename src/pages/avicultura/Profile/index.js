import React, { useEffect, useState } from 'react';
import { FiPower, FiEdit, FiList, FiGlobe, FiHelpCircle } from 'react-icons/fi';
import { useHistory, Link } from 'react-router-dom'

import './styles.css'
import Farmer from '../../../assets/farmer.svg';
import api from '../../../services/api';

export default function Profile() {
    const [nomeGranja, setNomeGranja] = useState('');

    const history = useHistory();
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        document.title = "Perfil - Avicultura"
    }, []);
    useEffect(() => {
        api.get('/profile/getnome', {
            headers: {
                Authorization: token,
            }
        }).then(response => {
            response.data.nome ? setNomeGranja(response.data.nome) : setNomeGranja(response.data.razaoSocial);
        })
    }, [token]);
    function logoff() {
        localStorage.clear();
        sessionStorage.clear();
        history.push('/');
    }
    return (
        <div className="profile-container">
            <div className="content">
                <header>
                    <h2>Minha Granja</h2>
                    <button onClick={logoff}>
                        <FiPower color={'#fff'} size={20} />
                    </button>
                </header>
                <div className="central">
                    <div className="img-container">
                        <img src={Farmer} alt="add Imagem" />
                    </div>
                    <h3>{nomeGranja}</h3>
                </div>
                <div className="container">
                    <h2>Informações da Granja</h2>
                    <div className="options">
                        <Link to="/profile/edit">
                            Alterar Dados
                            <FiEdit color={'#000'} size={25} />
                        </Link>
                        <Link to="/profile/listsessions/1">
                            Listar Ovos
                            <FiList color={'#000'} size={25} />
                        </Link>
                        <Link to="/profile/list-sector/1">
                            Listar Setores
                            <FiList color={'#000'} size={25} />
                        </Link>
                    </div>
                    <h2>Informações do Site</h2>
                    <div className="options">
                        <Link to="/profile/about">
                            Quem Somos?
                            <FiGlobe color={'#000'} size={25} />
                        </Link>
                        <Link to="/profile/faq">
                            FAQ
                            <FiHelpCircle color={'#000'} size={25} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}