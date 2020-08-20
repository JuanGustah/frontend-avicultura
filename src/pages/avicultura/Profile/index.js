import React from 'react';
import {FiPower,FiEdit,FiList,FiGlobe,FiHelpCircle} from 'react-icons/fi';
import {useHistory} from 'react-router-dom'

import './styles.css'
import addImg from '../../../assets/add_img.svg';

export default function Profile(){
    const granjaName=sessionStorage.getItem('granjaName');
    const history=useHistory();
    function logoff(){
        localStorage.clear();
        sessionStorage.clear();
        history.push('/');
    }
    return(
        <div className="profile-container">
            <div className="content">
                <header>
                    <h2>Minha Granja</h2>
                    <button onClick={logoff}>
                        <FiPower color={'#fff'} size={20}/>
                    </button>
                </header> 
                <div className="central">
                        <div className="img-container">
                        <img src={addImg} alt="add Imagem"/>
                        </div>
                        <h2>{granjaName}</h2>
                </div>
                <div className="container">
                    <h2>Informações da Granja</h2>
                    <div className="options">
                        <a href="#">
                            Alterar Dados
                            <FiEdit color={'#000'} size={25}/>
                        </a>
                        <a href="#">
                            Listar Ovos
                            <FiList color={'#000'} size={25}/>
                        </a>
                        <a href="#">
                            Listar Setores
                            <FiList color={'#000'} size={25}/>
                        </a>
                    </div>
                    <h2>Informações do Site</h2>
                    <div className="options">
                        <a href="#">
                            Quem Somos?
                            <FiGlobe color={'#000'} size={25}/>
                        </a>
                        <a href="#">
                            FAQ
                            <FiHelpCircle color={'#000'} size={25}/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}