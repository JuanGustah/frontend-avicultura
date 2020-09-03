import React,{useState} from 'react'
import {useHistory} from 'react-router-dom';

import api from '../../../../services/api'

import {FiCornerUpLeft} from 'react-icons/fi'
import './check.css';
import EmailImg from '../../../../assets/forgot_password.svg'

export default function CheckEmail(){
    const [email,setEmail]=useState();
    const history=useHistory();

    async function handleSubmit(event){
        event.preventDefault();

        api.post('/redefinir-senha',{email}).then(
            response=>{
                if(response.status===200){
                    alert('Um email foi enviado para você para que possamos redefinir sua senha, verifique sua caixa de mensagem.');
                    history.goBack();
        }}).catch((error)=>{
            alert('O email inserido não corresponde a nenhum email cadastrado.');
            console.log(error)
        })
            
    }
    return(
        <div className="check-container">
            <header>
                <button onClick={history.goBack}>
                        <FiCornerUpLeft/>
                        <p>Voltar</p>
                </button>
            </header>
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