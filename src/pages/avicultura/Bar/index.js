import React,{useEffect,useState,useRef} from 'react';
import {Link,NavLink,withRouter} from 'react-router-dom';

import logoImg from '../../../assets/chicken.svg'
import Dashboard from '../../../assets/dashboard.svg'
import DashboardAlt from '../../../assets/dashboard_alt.svg'
import sector from '../../../assets/sector.svg'
import sectorAlt from '../../../assets/sector_alt.svg'
import Egg from '../../../assets/egg.svg'
import EggAlt from '../../../assets/egg_alt.svg'
import User from '../../../assets/user.svg'
import UserAlt from '../../../assets/user_alt.svg'

import './styles.css'
export default function Bar(){
    const [linkActive,setLinkActive]=useState(sessionStorage.getItem("activeItem")
                                              ?sessionStorage.getItem("activeItem"):"Dashboard");

    function handleActiveLink(event){
        setLinkActive(event.target.className);
        sessionStorage.setItem("activeItem",event.target.className)
    }
    return(
        <div className="bar-container">
            <header>
                <img src={logoImg} alt="Imagem Logo" />
                <h3>Avicultura</h3>
            </header>

            <div className="route-container">
            <section>
                <NavLink to="/dashboard" activeClassName="dashboardActive" id="Dashboard" onClick={handleActiveLink}>
                    {linkActive==="Dashboard"?
                        <>
                            <img className="Dashboard" src={Dashboard} alt="Imagem Logo"/>
                            <h4 className="Dashboard">Dashboard</h4>
                        </>:
                        <>
                            <img className="Dashboard" src={DashboardAlt} alt="Imagem Logo"/>
                            <h4 className="Dashboard">Dashboard</h4>
                        </>
    
                    }
                </NavLink>
                <NavLink to="/sector" activeClassName="sectorActive" className="Setor"  onClick={handleActiveLink}>
                    {linkActive==="Setor"?
                        <>
                            <img className="Setor" src={sector} alt="Imagem Logo"/>
                            <div id="text">
                                <h4 className="Setor">Cadastrar</h4>
                                <h4 className="Setor">Setor</h4>
                            </div>
                        </>:
                        <>
                            <img className="Setor" src={sectorAlt} alt="Imagem Logo"/>
                            <div id="text">
                                <h4 className="Setor">Cadastrar</h4>
                                <h4 className="Setor">Setor</h4>
                            </div>
                        </>
                    }
                    
                </NavLink>
                <NavLink to="/egg" activeClassName="eggActive" className="Ovos" onClick={handleActiveLink}>
                    {linkActive==="Egg"?
                        <>
                            <img className="Egg" src={Egg} alt="Imagem Logo"/>
                            <div id="text">
                                <h4 className="Egg">Cadastrar</h4>
                                <h4 className="Egg">Ovos</h4>
                            </div>
                        </>
                        :
                        <>
                            <img className="Egg" src={EggAlt} alt="Imagem Logo"/>
                            <div id="text">
                                <h4 className="Egg">Cadastrar</h4>
                                <h4 className="Egg">Ovos</h4>
                            </div>
                        </>
                    }
                </NavLink>
                <NavLink to="/profile" activeClassName="userActive" className="Granja" onClick={handleActiveLink}>
                    {linkActive==="User"?
                        <>
                            <img className="User" src={User} alt="Imagem Logo"/>
                            <div id="text">
                                <h4 className="User">Minha</h4>
                                <h4 className="User">Granja</h4>
                            </div>
                        </>:
                         <>
                            <img className="User" src={UserAlt} alt="Imagem Logo"/>
                            <div id="text">
                                <h4 className="User">Minha</h4>
                                <h4 className="User">Granja</h4>
                            </div>
                        </>
                    }
                </NavLink>
            </section>
            </div>
        </div>
    )
}