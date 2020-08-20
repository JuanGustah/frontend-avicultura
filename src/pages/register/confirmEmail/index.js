import React,{useEffect} from 'react';

import celebrationImg from '../../../assets/celebration.svg';
import './styles.css';
import api from '../../../services/api';

export default function ConfirmEmail(){
    const id= "abcd"
    useEffect(()=>{
        const fetchData = async () => {
            await api.post('/confirmar-juridico',{id});
        };
        fetchData();
       
    },[])
    return(
        <div className="confirm-container">
            <div className="container">
                <img src={celebrationImg} alt="Celebração"/>
                <h1>Email confirmado!</h1>
                <p>Espere e alguns instantes você entrará no sistema....</p>
            </div>
        </div>
    )
}