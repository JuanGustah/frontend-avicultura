import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import {FiChevronRight} from 'react-icons/fi';
import {FiRotateCcw} from 'react-icons/fi';
import Egg from '../../../../assets/egg_list.svg'
import './styles.css'

import api from '../../../../services/api'
export default function Revisar(){
    const [ovosCadastrados,setOvosCadastrados]=useState([]);

    useEffect(()=>{
        api.get('/perfil-ovos')
        .then(response=>{
            setOvosCadastrados(response.data);
        })
    },[])
    return(
        <div className="revisar-container">
            <div className="content">
                <h2>Cadastro de Ovo</h2>
                <h3>Revisar</h3>
                <div className="container">
                <h3>Ovos inseridos</h3>
                <div className="collection">
                {ovosCadastrados.map(ovo=>(
                        <div className="row" key={ovo.id}>
                            <div className="title">
                                <img src={Egg} alt="Ovo Ícone"/>
                                <h4>Ovo {ovo.id}</h4>
                            </div>
                            <a href="#">
                                <b>+ Detalhes</b>
                            </a>
                        </div>
                    ))}
                </div>
                </div>
                <div className="button-menu">
                    <Link>
                    Encerrar
                    <FiChevronRight size={20}/>
                    </Link>
                    <Link to="/egg">
                        Novo Ovo   
                        <FiRotateCcw size={20}/>
                    </Link>
                </div>
            </div>
        </div>
    )
}