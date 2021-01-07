import React,{useEffect,useState} from 'react'
import {Link, useHistory,useParams} from 'react-router-dom'
import {FiChevronRight} from 'react-icons/fi';
import {FiRotateCcw} from 'react-icons/fi';
import Egg from '../../../../assets/egg_list.svg';
import './styles.css';

import Paginator from '../../../../components/paginator';

import api from '../../../../services/api';
export default function Revisar(){
    const {page}=useParams();

    const [eggPages,setEggPages]=useState(1);
    const [ovosCadastrados,setOvosCadastrados]=useState([]);

    const sessionId=sessionStorage.getItem('sessionId');
    const insertType=sessionStorage.getItem('insertType');
    const quantityFixed=sessionStorage.getItem('quantityFixed');
    const eggQuantity=sessionStorage.getItem('eggQuantity');
    const component=sessionStorage.getItem('component');
    const nextRoute=sessionStorage.getItem('nextRoute');
    const token=sessionStorage.getItem('token');
    
    useEffect(()=>{
        api.get(`egg-session/get-eggs?sessionid=${sessionId}&page=${page}`,{
            headers:{
                Authorization:token,
            }
        })
        .then(response=>{
            setOvosCadastrados(response.data.eggData);
            setEggPages(response.data.pages);
        })

    },[page])
    function nextRouteWithoutQuantity(){
        if(nextRoute!=='finalizar'){
            sessionStorage.setItem('eggQuantity',sessionStorage.getItem('eggIndex'));
        }else{
            sessionStorage.setItem('afterInsection',true);
        }
    }

    return(
        <div className="revisar-container">
            <div className="content">
                <h2>Cadastro de Ovo</h2>
                <h3>Revisar</h3>
                <div className="container">
                <h3>Ovos inseridos</h3>
                <div className="collection">
                {ovosCadastrados.map(ovo=>(
                        ovo[`${component}Empty`]===0 || component==='Ovo'? 
                        <div className="row" key={ovo.id}>
                            <div className="title">
                                <img src={Egg} alt="Ovo Ícone"/>
                                <h4>{component} {ovo.id}</h4>
                            </div>
                            <div className="button-group">
                                <Link to={`/egg/details?id=${ovo.id}&session=${ovo.secao_id}`}>
                                    <b>Detalhes / Editar</b>
                                </Link>
                            </div>
                        </div>
                        :null
                    ))}
                </div>
                <Paginator src="/egg/revisar/" pages={eggPages} page={page}/>
                </div>
                {insertType==="componentes" && eggQuantity !== null && component===nextRoute?
                    <div className="button-menu">
                        <Link to={`/egg/${component}`}>
                            Inserir o restante
                            <FiRotateCcw size={20}/>
                        </Link>
                    </div>  
                    : null
                }{insertType==="componentes" && eggQuantity !== null && component!==nextRoute ?
                    <div className="button-menu">
                        <Link to={`/egg/${nextRoute}`} >
                            {nextRoute}
                            <FiChevronRight size={20}/>
                        </Link>
                    </div>
                    : null
                }
                {insertType==="componentes" && eggQuantity === null && quantityFixed==='false' && nextRoute!=="finalizar"?
                    <div className="button-menu">
                        <Link to={`/egg/${nextRoute}`} onClick={nextRouteWithoutQuantity} >
                            {nextRoute}
                            <FiChevronRight size={20}/>
                        </Link>
                        <Link to={`/egg/${component}`}>
                            Novo {component}   
                            <FiRotateCcw size={20}/>
                        </Link>
                    </div>  
                    : null
                }
                {insertType==="componentes" && eggQuantity === null && quantityFixed==='false' &&nextRoute==="finalizar"?
                    <div className="button-menu">
                        <Link to={`/egg/${nextRoute}`}>
                            {nextRoute}
                            <FiChevronRight size={20}/>
                        </Link>
                        <Link to='/egg/albumen' onClick={nextRouteWithoutQuantity}>
                            Novo {component}   
                            <FiRotateCcw size={20}/>
                        </Link>
                    </div>  
                    : null
                }
                {insertType==="ovos" ?
                    <div className="button-menu">
                        <Link to="/egg/finalizar">
                            Finalizar
                            <FiChevronRight size={20}/>
                        </Link>
                        <Link to="/egg/albumen">
                            Novo Ovo   
                            <FiRotateCcw size={20}/>
                        </Link>
                    </div>  
                    : null
                }
            </div>
        </div>
    )
}