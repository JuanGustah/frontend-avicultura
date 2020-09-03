import React,{useState} from 'react'
import {useParams,useHistory} from 'react-router-dom'

import api from '../../../../services/api'

import {FiEye,FiEyeOff,FiAlertCircle} from 'react-icons/fi';
import './change.css'

export default function ChangePassword(){
    const {id}=useParams();
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [showPassword,setShowPassword]=useState(false);
    const [showConfirmPassword,setShowConfirmPassword]=useState(false);
    const [showErrorMessage,setShowErrorMessage]=useState(false);
    const history=useHistory();

    async function handleSubmit(event){
        event.preventDefault();

        if(password===confirmPassword){
            await api.put('/login/updatepassword',{id,password}).then(
                alert('Senha alterada com sucesso!'),
                history.push('/')
            )
        }else{
            setShowErrorMessage(true);
        }
    }
    return(
    <div className="change-container">
        <div className="container">              
            <h2>Email confirmado! <br/> Agora vamos mudar sua senha...</h2>
            <form onSubmit={handleSubmit}>
            <h3>Insira sua nova senha</h3>
            <div className="password">
                <input type={showPassword?'text':'password'}
                placeholder="Senha"
                value={password}
                onChange={e=> setPassword(e.target.value)}
                />
                {showPassword? <FiEyeOff size={20} onClick={()=>setShowPassword(!showPassword)}/>: 
                <FiEye size={20} onClick={()=>setShowPassword(!showPassword)}/> }
            </div>
            <h3>Repita sua senha</h3>
            <div className="password">
                <input type={showConfirmPassword?'text':'password'}
                placeholder="Senha"
                value={confirmPassword}
                onChange={e=> setConfirmPassword(e.target.value)}
                />
                {showConfirmPassword? <FiEyeOff size={20} onClick={()=>setShowConfirmPassword(!showConfirmPassword)}/>: 
                <FiEye size={20} onClick={()=>setShowConfirmPassword(!showConfirmPassword)}/> }
            </div>
            {showErrorMessage ?<p><FiAlertCircle size={20} color={"#ff3a3a"}/><b>As senhas inseridas não coincidem.</b></p> : <></>  }
            <div className="button_row">
            <button type="submit">Finalizar</button>
            </div>
            </form>
        </div>
    </div>

    )
}