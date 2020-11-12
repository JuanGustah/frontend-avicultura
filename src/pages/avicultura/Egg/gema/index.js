import React,{useState,useEffect} from 'react';
import {FiChevronRight,FiPower,FiEye} from 'react-icons/fi';
import {useHistory} from 'react-router-dom';

import api from '../../../../services/api'
import './styles.css'

export default function Gema(){
    const [eggIndex,setEggIndex]=useState(1);
    const [alturaGema,setAlturaGema]=useState('');
    const [diametroGema,setDiametroGema]=useState('');
    const [pesoGema,setPesoGema]=useState('');
    const [corGema,setCorGema]=useState('');

    const token=sessionStorage.getItem('token');
    const sessionId=sessionStorage.getItem('sessionId');
    const insertType=sessionStorage.getItem('insertType');
    const eggQuantity=sessionStorage.getItem('eggQuantity');


    const history=useHistory();

    useEffect(()=>{
        if(sessionStorage.getItem('eggIndex')!==null){
            setEggIndex(sessionStorage.getItem('eggIndex'));
            sessionStorage.removeItem('eggIndex');
        };
        sessionStorage.removeItem('component');
        sessionStorage.removeItem('eggIndex');
    },[token])

    async function handleGema(event){
        event.preventDefault();

        const data={
            alturaGema,
            diametroGema,
            pesoGema,
            corGema,
        }
        if(eggQuantity!==null){
            if(parseInt(eggIndex,10)===parseInt(eggQuantity,10)){
                try{
                    await api.put(`/perfil-ovos/${eggIndex}`,data,{
                        headers:{
                            Authorization:token,
                        }
                    })
                    sessionStorage.setItem('insertType',insertType);
                    sessionStorage.setItem('component','gema');
                    sessionStorage.setItem('nextRoute','casca');
                    history.push('/egg/revisar/1')
                }catch(error){
                    alert('Erro ao inserir albúmen! Por favor,tente novamente')
                }
            }else{
                try{
                    await api.put(`/perfil-ovos/${eggIndex}`,data,{
                        headers:{
                            Authorization:sessionId,
                        }
                    })
                    setEggIndex(eggIndex*1+1);
                    setAlturaGema('');
                    setCorGema('');
                    setDiametroGema('');
                    setPesoGema('');
                }catch(error){
                    alert('Erro ao inserir albúmen! Por favor,tente novamente')
                }
            }
        }
    }
    function logoff(){
        localStorage.clear();
        sessionStorage.clear();
        history.push('/');
    }
    function viewEggInserted(){
        sessionStorage.setItem('eggIndex',eggIndex);
        sessionStorage.setItem('component','gema');
        sessionStorage.setItem('nextRoute','gema');
        history.push('/egg/revisar/1');
    }

    return(
        <div className="ovo-container">
            <div className="content">
                <header>
                        <div className="header-row">
                            <div>
                            <h2>Cadastro de ovos</h2>
                            <h3>Gema</h3>
                            </div>
                            <button onClick={logoff}>
                                <FiPower color={'#000'} size={20}/>
                            </button>
                        </div>
                        <div className="header-row">
                            {insertType==='componentes'&& eggQuantity !== null ?
                            <h3>{eggIndex}/{eggQuantity}</h3>
                            :null}
                        </div>
                </header>

                <div className="container">
                <form onSubmit={handleGema} id="sector_form">
                        <div className="input-group">
                            <div className="input">
                                <h4>Altura da Gema</h4>
                                <div className="label">
                                    <input type="number"
                                    value={alturaGema}
                                    onChange={e=>setAlturaGema(e.target.value)}
                                    />
                                    <p>Milímetros</p>
                                </div>
                            </div>
                            <div className="input">
                                <h4>Diâmetro da Gema</h4>
                                <div className="label">
                                <input type="text"
                                    value={diametroGema}
                                    onChange={e=>setDiametroGema(e.target.value)}
                                />
                                <p>Milímetros</p>
                                </div>
                            </div>
                            <div className="input">
                                <h4>Peso da Gema</h4>
                                <div className="label">
                                <input type="number"
                                    value={pesoGema}
                                    onChange={e=>setPesoGema(e.target.value)}
                                />
                                <p>Gramas</p>
                                </div>
                            </div>
                            <div className="input">
                                <h4>Cor da Gema</h4>
                                <div className="label">
                                <input type="number"
                                    value={corGema}
                                    onChange={e=>setCorGema(e.target.value)}
                                />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <button type="submit" form="sector_form">
                    {parseInt(eggIndex,10)===parseInt(eggQuantity,10) ? 'Finalizar' : 'Inserir'}
                    <FiChevronRight size={20}/>
                </button>
                {eggIndex>1?
                    <button type="button" onClick={viewEggInserted}>
                        Visualizar
                        <FiEye size={20}/>
                    </button>
                    :null
                }
            </div>
        </div>
    )
}