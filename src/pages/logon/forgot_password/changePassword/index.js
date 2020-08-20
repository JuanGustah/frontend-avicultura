import React,{useEffect,useState} from 'react'
import {useParams,useHistory} from 'react-router-dom'

import api from '../../../../services/api'
import './change.css'

export default function ChangePassword(){
    const {id}=useParams();
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const history=useHistory();

    async function handleSubmit(event){
        event.preventDefault();

        if(password===confirmPassword){
            await api.put('/login/updatepassword',{id,password}).then(
                alert('Senha alterada com sucesso!'),
                history.push('/')
            )
        }
    }
    return(
    <div className="change-container">
        <div className="container">              
            <h2>Email confirmado! <br/> Agora vamos mudar sua senha...</h2>
            <form onSubmit={handleSubmit}>
            <h3>Insira sua nova senha</h3>
            <input type="text"
            value={password}
            onChange={e=> setPassword(e.target.value)}
            required
            />
            <h3>Repita sua senha</h3>
            <input type="text"
            value={confirmPassword}
            onChange={e=> setConfirmPassword(e.target.value)}
            required
            />
            <div className="button_row">
            <button type="submit">Finalizar</button>
            </div>
            </form>
        </div>
    </div>

    )
}