import React,{useEffect} from 'react';
import {Link} from 'react-router-dom';

import logoImg from '../../../assets/chicken.svg'
import Dashboard from '../../../assets/dashboard.svg'
import sector from '../../../assets/sector.svg'
import Egg from '../../../assets/egg.svg'
import User from '../../../assets/user.svg'

import './styles.css'
export default function Bar(){
    useEffect(()=>{
        const url=window.location.pathname;
        const hr=document.querySelector('hr');
        switch(url){
            case '/dashboard':
                hr.style.top='52px';
                break;
            case '/sector':
                hr.style.top='122px';
                break;
            case '/egg':
            case '/egg/albumen':
            case '/egg/casca':
            case '/egg/revisar':
                hr.style.top='195px';
                break;
            default:
                hr.style.display='none';
        }
    },[])
    function translateHr(event){
        const hr=document.querySelector('hr');
        switch(event.target.id){
            case 'dashboard':
                hr.style.top='52px';
                break;
            case 'sector':
                hr.style.top='122px';
                break;
            case 'egg':
                hr.style.top='195px';
                break;
            case 'perfil':
                hr.style.top='267px';
                break;
            default:
                hr.style.display='none';
        }
    }
    return(
        <div className="bar-container">
            <header>
                <img src={logoImg} alt="Imagem Logo" />
                <h3>Avicultura</h3>
            </header>

            <div className="route-container">
            <hr/>
            <section>
                <Link to="/dashboard" className="Dashboard" onClick={translateHr}>
                    <img src={Dashboard} alt="Imagem Logo"/>
                    <h4 id="dashboard">Dashboard</h4>
                </Link>
                <Link to="/sector" className="Setor" onClick={translateHr}>
                    <img src={sector} alt="Imagem Logo"/>
                    <div className="text">
                        <h4 id="sector">Cadastrar</h4>
                        <p id="sector">Setor</p>
                    </div>
                </Link>
                <Link to="/egg" className="Ovos" onClick={translateHr}>
                    <img src={Egg} alt="Imagem Logo"/>
                    <div className="text">
                        <h4 id="egg">Cadastrar</h4>
                        <p id="egg">Ovos</p>
                    </div>
                </Link>
                <Link to="/profile" className="Granja" onClick={translateHr}>
                    <img src={User} alt="Imagem Logo"/>
                    <div className="text">
                        <h4 id="perfil">Minha</h4>
                        <p id="perfil">Granja</p>
                    </div>
                </Link>
            </section>
            </div>
        </div>
    )
}