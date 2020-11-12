import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {FiChevronRight,FiPower,FiEye} from 'react-icons/fi';

import api from '../../../../services/api'
import './styles.css'

export default function Albumen(){
    const [alturaAlbumen,setAlturaAlbumen]=useState('');
    const [diametroAlbumen,setDiametroAlbumen]=useState('');
    const [insertType,setInsertType]=useState('');
    const [eggIndex,setEggIndex]=useState(1);
    const [lote,setLote]=useState('');
    
    const eggQuantity=sessionStorage.getItem('eggQuantity');
    const sessionId=sessionStorage.getItem('sessionId');
    const token=sessionStorage.getItem('token');
    const history=useHistory();

    function logoff(){
        localStorage.clear();
        sessionStorage.clear();
        history.push('/');
    }
    function viewEggInserted(){
        sessionStorage.setItem('eggIndex',eggIndex);
        sessionStorage.setItem('insertType',insertType);
        sessionStorage.setItem('component','albumen');
        sessionStorage.setItem('nextRoute','albumen');
        history.push('/egg/revisar/1');
    }
    
    useEffect(()=>{
        if(sessionId===null){
            alert('É necessário escolher os dados de entrada!');
            history.push('/egg')
        }else{
            async function setUpAlbumen(){
                try{
                    if(sessionStorage.getItem('eggIndex')!==null){
                        setEggIndex(sessionStorage.getItem('eggIndex'));
                        sessionStorage.removeItem('eggIndex');
                    };
                    if(sessionStorage.getItem('component')!==null){
                        sessionStorage.removeItem('component');
                    };
                    if(sessionStorage.getItem('insertType')!==null){
                        sessionStorage.removeItem('insertType');
                    };
                    
                    const {data}=await api.get(`/egg-session/get-session/${sessionId}`,{
                        headers:{
                            Authorization:token,
                        }
                    });

                    setInsertType(data.sessionData.insection_way);
                    setLote(data.sessionData.lote);
                }catch(error){
                    console.log(error);
                }
            }
            setUpAlbumen();
        }
    })
    async function HandleAlbumen(event){
        event.preventDefault();
        
        const data={
            id:eggIndex,
            secao_id:sessionId,
            lote,
            alturaAlbumen,
            diametroAlbumen
        }

        if(eggQuantity!==null){
            if(parseInt(eggIndex,10)===parseInt(eggQuantity,10)){
                
                try{
                    await api.post('/ovo',data,{
                        headers:{
                            Authorization:token,
                        }
                    })
                    sessionStorage.setItem('insertType',insertType);
                    sessionStorage.setItem('component','albumen');
                    sessionStorage.setItem('nextRoute','gema');
                    history.push('/egg/revisar/1')
                }catch(error){
                    alert('Erro ao inserir albúmen! Por favor,tente novamente')
                }
            }else{
                try{
                    await api.post('/ovo',data,{
                        headers:{
                            Authorization:token,
                        }
                    })
                    setEggIndex(eggIndex*1+1);
                    setDiametroAlbumen('');
                    setAlturaAlbumen('');
                }catch(error){
                    alert('Erro ao inserir albúmen! Por favor,tente novamente')
                }
            }
        }
    }
    return(
        <div className="albumen-container">
            <div className="content">
            <header>
                    <div className="header-row">
                        <div>
                        <h2>Cadastro de ovos</h2>
                        <h3>Albúmen</h3>
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
                <form onSubmit={HandleAlbumen} id="sector_form">
                        <div className="input-group">
                            <div className="input">
                                <h4>Altura do Albúmen</h4>
                                <div className="label">
                                <input type="number"
                                value={alturaAlbumen}
                                onChange={e=>setAlturaAlbumen(e.target.value)}
                                /> 
                                <p>Milímetros</p>
                                </div>
                            </div>
                            <div className="input">
                                <h4>Diâmetro do Albúmen</h4>
                                <div className="label">
                                    <input type="number"
                                    value={diametroAlbumen}
                                    onChange={e=>setDiametroAlbumen(e.target.value)}
                                    />
                                    <p>Milímetros</p>
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