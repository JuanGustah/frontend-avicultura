import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'

import api from '../../../../services/api'
import './check.css';
import EmailImg from '../../../../assets/forgot_password.svg'

export default function CheckEmail(){
    const history= useHistory();
    const [email,setEmail]=useState();
    async function handleSubmit(event){
        event.preventDefault();

        await api.post('/redefinir-senha',{email}).then(
            alert('Um email foi enviado para você para que possamos redefinir sua senha, verifique sua caixa de mensagem.')
        )
    }
    return(
        <div className="check-container">
            <div className="container">
                <img src={EmailImg} alt="Email Imagem"/>                
                <form onSubmit={handleSubmit}>

                    <h3>Insira o email da sua conta</h3>

                    <input type="text"
                    autoComplete="none"
                    value={email}
                    onChange={e=> setEmail(e.target.value)}
                    required
                    />

                    <div className="button_row">
                        <button type="submit">Enviar Email</button>
                    </div>

                </form>
            </div>
        </div>
    )
}