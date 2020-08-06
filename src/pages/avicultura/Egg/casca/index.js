import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import {FiChevronRight} from 'react-icons/fi';
import api from '../../../../services/api'

import './styles.css'

export default function Casca(){
    const [pesoCasca,setPesoCasca]=useState('');
    const [espessuraP1,setEspessuraP1]=useState('');
    const [espessuraP2,setEspessuraP2]=useState('');
    const [espessuraP3,setEspessuraP3]=useState('');
    const [corCasca,setCorCasca]=useState(1);
    const gemaID=localStorage.getItem('gemaID');
    const albumenID=localStorage.getItem('albumenID');
    const pesoOvo=localStorage.getItem('pesoOvo');
    const loteOvo=localStorage.getItem('loteOvo');
    const granjaID=localStorage.getItem('granjaID');
    const history=useHistory();

    async function handleCasca(event){
        event.preventDefault();
        const dataCasca={
            pesoCasca,
            espessuraP1,
            espessuraP2,
            espessuraP3,
            corCasca
        }
        const dataOvo={
            id_gema:gemaID,
            id_albumen:albumenID,
            id_casca:0,
            lote:loteOvo,
            pesoOvo
        }
        try{
            const responseCascaId=await api.post('/casca',dataCasca);
            localStorage.setItem('cascaID',responseCascaId);
            dataOvo.id_casca=responseCascaId.data.id;
            await api.post('/ovo',dataOvo,{
                headers:{
                    Authorization:granjaID
                }
            })
            alert("Ovo Cadastrado com Sucesso!");
            localStorage.removeItem('gemaID')
            localStorage.removeItem('albumenID')
            localStorage.removeItem('pesoOvo')
            localStorage.removeItem('loteOvo')

            history.push('/egg/revisar');
        }catch(error){
            alert("Problema ao inserir Casca em ovo. Por favor,tente novamente.");
        }
    }
    function bubbleValue(event){
        const bubble=document.getElementsByClassName('bubble')[0];

        bubble.style.display="block"
        const val = event.target.value;
        bubble.innerHTML = val;
    }

    return(
        <div className="casca-container">
            <div className="content">
                <h2>Cadastro de Ovo</h2>
                <h3>Casca</h3>
                <div className="container">
                <form onSubmit={handleCasca} id="sector_form">
                        <div className="input-group">
                            <div className="input">
                                <h4>Peso da Casca</h4>
                                <div className="label">
                                <input type="number"
                                value={pesoCasca}
                                onChange={e=>setPesoCasca(e.target.value)}
                                />
                                <p>Gramas</p>
                                </div>
                            </div>
                            <div className="input">
                                <h4>Espessura da casca</h4>
                                <div className="label">
                                <input type="number"
                                 value={espessuraP1}
                                 onChange={e=>setEspessuraP1(e.target.value)}
                                /> 
                                <p>Ponto 1</p>
                                </div>
                                <div className="label">
                                <input type="number"
                                 value={espessuraP2}
                                 onChange={e=>setEspessuraP2(e.target.value)}
                                /> 
                                <p>Ponto 2</p>
                                </div>
                                <div className="label">
                                <input type="number"
                                 value={espessuraP3}
                                 onChange={e=>setEspessuraP3(e.target.value)}
                                /> 
                                <p>Ponto 3</p>
                                </div>
                            </div>
                        </div>
                        <div className="range">
                            <div className="range-title">
                            <h4>Cor da Casca</h4>
                            <output className="bubble"></output>
                            </div>
                            <div className="range-input">
                            <input type="range" min="1" max="7" 
                            name="aves_range" 
                            onInput={bubbleValue}
                            value={corCasca}
                            onChange={e=>setCorCasca(e.target.value)}
                            />
                            <hr/>
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