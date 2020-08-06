import React from 'react'
import { Link } from "react-router-dom";

import './chooser.css'
import LegalImg from '../../../assets/work.svg'
import PhysicalImg from '../../../assets/user-white.svg'

export default function Chooser(){
    return(
        <div className="chooser-container">
            <h1>Escolha uma das opções abaixo:</h1>
            <div className="options">
                <Link to="/register/legal" className="card">
                    <img src={LegalImg} alt="Granja Jurídica"/>
                    <h4>Granja Jurídica</h4>
                </Link>
                <Link to="/register/physical" className="card">
                    <img src={PhysicalImg} alt="Granja Fisica"/>
                    <h4>Granja Física</h4>
                </Link>
            </div>
        </div>
    )
}