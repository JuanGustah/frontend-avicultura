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
    const [gemaEmpty,setGemaEmpty]=useState(false);

    const token=sessionStorage.getItem('token');
    const sessionId=sessionStorage.getItem('sessionId');
    const insertType=sessionStorage.getItem('insertType');
    const eggQuantity=sessionStorage.getItem('eggQuantity');
    const quantityFixed= sessionStorage.getItem('quantityFixed');
    const firstIndex=sessionStorage.getItem('firstIndex');

    const history=useHistory();

    useEffect(()=>{
        if(sessionStorage.getItem('eggIndex')!==null&&quantityFixed===null){
            setEggIndex(sessionStorage.getItem('eggIndex'));
        }else{
            if(sessionStorage.getItem('eggIndex')!==null&&sessionStorage.getItem('component')===sessionStorage.getItem('nextRoute')){
                setEggIndex(sessionStorage.getItem('eggIndex'));
            }else{
                if(sessionStorage.getItem('afterInsection')!==null){
                    setEggIndex(firstIndex);
                }else{
                    if(insertType==="ovos"){
                        setEggIndex(sessionStorage.getItem('eggIndex'));
                    }
                }
            }
            
        }
        sessionStorage.removeItem('component');
        sessionStorage.removeItem('eggIndex');
        sessionStorage.removeItem('nextRoute');
    },[token])

    async function handleGema(event){
        event.preventDefault();

        if(alturaGema===''&&diametroGema===''&&pesoGema===''&&corGema===''){
            setGemaEmpty(true);
        }

        const data={
            gemaEmpty,
            alturaGema,
            diametroGema,
            pesoGema,
            corGema,
        }
        
        if(insertType==="componentes"){
            if(parseInt(eggIndex,10)===parseInt(eggQuantity,10)&&sessionStorage.getItem('afterInsection')===null){
                try{
                    await api.put(`/perfil-ovos/${eggIndex}`,data,{
                        headers:{
                            Authorization:sessionId,
                        }
                    })
                    sessionStorage.setItem('insertType',insertType);
                    sessionStorage.setItem('component','gema');
                    sessionStorage.setItem('nextRoute','casca');
                    history.push('/egg/revisar/1')
                }catch(error){
                    alert('Erro ao inserir gema! Por favor,tente novamente')
                }
            }else{
                if(parseInt(eggIndex,10)===parseInt(eggQuantity,10)&&sessionStorage.getItem('afterInsection')!==null){
                    try{
                        await api.put(`/perfil-ovos/${eggIndex}`,data,{
                            headers:{
                                Authorization:sessionId,
                            }
                        })
                        sessionStorage.setItem('insertType',insertType);
                        sessionStorage.setItem('component','gema');
                        sessionStorage.setItem('nextRoute','casca');
                        sessionStorage.setItem('eggIndex',firstIndex);
                        history.push('/egg/revisar/1')
                    }catch(error){
                        alert('Erro ao inserir gema! Por favor,tente novamente')
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
                        alert('Erro ao inserir gema! Por favor,tente novamente')
                    }
                }
            }
        }else{
            try{
                await api.put(`/perfil-ovos/${eggIndex}`,data,{
                    headers:{
                        Authorization:sessionId,
                    }
                })
                sessionStorage.setItem('insertType',insertType);
                sessionStorage.setItem('eggIndex',eggIndex);
                history.push('/egg/casca');
            }catch(error){
                alert('Erro ao inserir gema! Por favor,tente novamente')
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
                            {eggQuantity !== null && insertType==="componentes"?
                                <h3>{eggIndex}/{eggQuantity}</h3>:
                                <h3>Ovo {eggIndex}</h3>
                            }
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
                    {eggQuantity&&parseInt(eggIndex,10)===parseInt(eggQuantity,10) ? 'Finalizar' : 'Inserir'}
                    <FiChevronRight size={20}/>
                </button>
                {eggIndex>1&&insertType==="componentes"?
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