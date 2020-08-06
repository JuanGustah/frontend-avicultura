import React from 'react'
import {useHistory} from 'react-router-dom'

import './check.css';

import EmailImg from '../../../../assets/forgot_password.svg'

export default function CheckEmail(){
    const history= useHistory();
    return(
        <div className="check-container">
            <div className="container">
                <img src={EmailImg} alt="Email Imagem"/>                
                <form >
                <h3>Insira o email da sua conta</h3>
                <input type="text"/>
                <div className="button_row">
                <button onClick={()=>history.push('/forgotpassword/change')}>Prosseguir</button>
                </div>
                </form>
            </div>
        </div>
    )
}