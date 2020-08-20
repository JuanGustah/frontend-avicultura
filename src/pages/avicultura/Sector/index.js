import React,{useState} from 'react';
import {FiChevronRight,FiPower} from 'react-icons/fi';
import {useHistory} from 'react-router-dom'
import './styles.css';

import api from '../../../services/api';

export default function Sector(){
    const [galpao,setGalpao]=useState(0);
    const [linhagem,setLinhagem]=useState('');
    const [idade,setIdade]=useState(0);
    const [nutrição,setNutricao]=useState('');
    const [numero_de_aves,setAves]=useState(0);
    const token=sessionStorage.getItem('token');
    const history=useHistory();

    async function handleSector(event){

        const data={
            linhagem,
            idade,
            nutrição,
            numero_de_aves,
            galpao,
        }
        try{
            const response=await api.post('/setor-lote',data,{
                headers:{
                    Authorization:token,
                }
            })
            alert(`Setor cadastrado com Sucesso! Seu id é: ${response.data.id}`)
        }
        catch(error){
            alert('Algo deu errado,tente novamente')
        }
    }
    function logoff(){
        localStorage.clear();
        sessionStorage.clear();
        history.push('/');
    }
    
    return(
        <div className="section-container">
            <div className="content">
                <header>
                    <h2>Cadastro de Setor/Lote</h2>
                    <button onClick={logoff}>
                        <FiPower color={'#fff'} size={20}/>
                    </button>
                </header>
                <div className="container">
                    <form onSubmit={handleSector} id="sector_form">
                        <div className="input-group">
                            <div className="input">
                                <h4>Galpão</h4>
                                <input type="number"
                                value={galpao}
                                onChange={e=>setGalpao(e.target.value)}
                                />
                            </div>
                            <div className="input">
                                <h4>Linhagem</h4>
                                <input type="text"
                                value={linhagem}
                                onChange={e=>setLinhagem(e.target.value)}
                                /> 
                            </div>
                            <div className="input">
                                <h4>Idade</h4>
                                <div className="label">
                                    <input type="number"
                                    value={idade}
                                    onChange={e=>setIdade(e.target.value)}
                                    />
                                    <p>Semanas</p>
                                </div>
                            </div>
                            <div className="input">
                                <h4>Nutrição</h4>
                                <input type="text"
                                value={nutrição}
                                onChange={e=>setNutricao(e.target.value)}
                                />
                            </div>
                            <div className="input">
                                <h4>Número de Aves</h4>
                                <input type="number"
                                value={numero_de_aves}
                                onChange={e=>setAves(e.target.value)}
                                />
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