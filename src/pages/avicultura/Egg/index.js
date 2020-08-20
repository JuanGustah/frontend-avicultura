import React,{useState,useEffect} from 'react';
import {FiChevronRight,FiPower} from 'react-icons/fi';
import {useHistory} from 'react-router-dom';

import api from '../../../services/api'
import './styles.css'

export default function Egg(){
    const [pesoOvo,setPesoOvo]=useState('');
    const [loteOvoCadastrados,setLoteOvoCadastrados]=useState([]);
    const [loteOvo,setLoteOvo]=useState('');
    const [alturaGema,setAlturaGema]=useState('');
    const [diametroGema,setDiametroGema]=useState('');
    const [pesoGema,setPesoGema]=useState('');
    const [corGema,setCorGema]=useState('');
    const token=localStorage.getItem('token')
    const history=useHistory();

    useEffect(()=>{
        api.get('/perfil-lote',{
            headers:{
                Authorization:token,
            }
        }).then(response=>{
            setLoteOvoCadastrados(response.data)
        })
        alert('Devido as ultimas alterações,aqui parou de funcionar')
    },[token])

    async function handleGema(event){
        event.preventDefault();

        const data={
            alturaGema,
            diametroGema,
            pesoGema,
            corGema,
        }
        try{
            const response=await api.post('/gema',data);
            localStorage.setItem('gemaID',response.data.id);
            localStorage.setItem('pesoOvo',pesoOvo);
            localStorage.setItem('loteOvo',loteOvo);

            history.push('/egg/albumen');
        }
        catch(error){
            alert('Não foi possível cadastrar gema,tente novamente')
        }
    }
    function bubbleValue(event){
        const bubble=document.getElementsByClassName('bubble')[0];

        bubble.style.display="block"
        const val = event.target.value;
        bubble.innerHTML = val;
    
    }
    function logoff(){
        localStorage.clear();
        history.push('/');
    }
    return(
        <div className="ovo-container">
            <div className="content">
                <header>
                    <div>
                        <h2>Cadastro de ovo</h2>
                        <h3>Gema</h3>
                    </div>
                    <button onClick={logoff}>
                        <FiPower color={'#000'} size={20}/>
                    </button>
                </header>

                <div className="container">
                <form onSubmit={handleGema} id="sector_form">
                        <div className="input-group">
                            <div className="input">
                                <h4>Peso do Ovo</h4>
                                <div className="label">
                                <input type="number"
                                value={pesoOvo}
                                onChange={e=>setPesoOvo(e.target.value)}
                                />
                                <p>Gramas</p>
                                </div>
                            </div>
                            <div className="input" >
                                <h4>Lote do Ovo</h4>
                                <select onChange={e=>setLoteOvo(e.target.value)} value={loteOvo}>
                                    <option value="" disabled>Escolha um Lote</option>
                                    {loteOvoCadastrados.map(lote=>(
                                        <option value={lote.lote_id} key={lote.lote_id}>Galpão {lote.galpao}</option>
                                    ))}
                                </select>
                            </div>
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
                        </div>
                        <div className="range">
                            <div className="range-title">
                            <h4>Cor da Gema</h4>
                            <output className="bubble"></output>
                            </div>
                            <div className="range-input">
                            <input type="range" min="1" max="17" 
                            name="aves_range" 
                            onInput={bubbleValue}
                            value={corGema}
                            onChange={e=>setCorGema(e.target.value)}
                            />
                            <hr/>
                            </div>
                        </div>
                    </form>
                </div>
                <button type="submit" form="sector_form">
                    Albúmen
                    <FiChevronRight size={20}/>
                </button>
            </div>
        </div>
    )
}