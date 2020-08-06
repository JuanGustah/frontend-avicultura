import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {FiChevronRight} from 'react-icons/fi';

import api from '../../../../services/api'
import './styles.css'

export default function Albumen(){
    const [pesoAlbumen,setPesoAlbumen]=useState('');
    const [alturaAlbumen,setAlturaAlbumen]=useState('');
    const [diametroAlbumen,setDiametroAlbumen]=useState('');
    const gemaID=localStorage.getItem('gemaID');
    const history=useHistory();

    useEffect(()=>{
        if(typeof gemaID===undefined){
            alert('É necessário ter inserido a gema primeiro!');
            history.push('/egg')
        }
    })
    async function HandleAlbumen(event){
        event.preventDefault();
        
        const Data={
            pesoAlbumen,
            alturaAlbumen,
            diametroAlbumen
        }
        try{
            const response=await api.post('/albumen',Data);
            localStorage.setItem('albumenID',response.data.id)
            history.push('/egg/casca')
        }catch(error){
            alert('Erro ao inserir albúmen! Por favor,tente novamente')
        }
    }
    return(
        <div className="albumen-container">
            <div className="content">
                <h2>Cadastro de albumen</h2>
                <h3>Albúmen</h3>
                <div className="container">
                <form onSubmit={HandleAlbumen} id="sector_form">
                        <div className="input-group">
                            <div className="input">
                                <h4>Peso do Albúmen</h4>
                                <div className="label">
                                <input type="number"
                                value={pesoAlbumen}
                                onChange={e=>setPesoAlbumen(e.target.value)}
                                />
                                <p>Gramas</p>
                                </div>
                            </div>
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
                    Cadastrar
                    <FiChevronRight size={20}/>
                </button>
            </div>
        </div>
    )
}