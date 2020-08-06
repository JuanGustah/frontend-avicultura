import React,{useState} from 'react';
import logoImg from '../../assets/chicken.svg'
import background from '../../assets/egground.svg'
import {Link,useHistory} from 'react-router-dom';
import api from '../../services/api'

import './logon.css'

export default function Logon (){
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const history=useHistory();

    async function handleLogin(event){
        event.preventDefault();
        const data={
            email,
            password
        }
        try{
            const response=await api.post('login',data);
            sessionStorage.setItem('granjaName',response.data.granja.nomeFantasia);
            sessionStorage.setItem('granjaID',response.data.granja.id);
            sessionStorage.setItem('token',response.data.responsejwt);
            history.push('/dashboard');
        }
        catch(error){
            alert('O Email e Senha informado não corresponde a nenhuma granja cadastrada')
        }
    }

    return(
        <div className="login-container">
            <img src={background} alt="ovo background" className="eggground"/>
            <section className="form" >
                <img src={logoImg} alt="Imagem Logo"/>
                <form onSubmit={handleLogin}>
                    <h1>Bem vindo de volta</h1>
                    <h3>Faça seu Login para continuar</h3>

                    <div className="email">
                        <input 
                        type="text" 
                        placeholder="Email"
                        value={email}
                        onChange={e=> setEmail(e.target.value)}
                        />
                    </div>
                    <div className="password">
                    <input type="password" 
                        placeholder="Senha"
                        value={password}
                        onChange={e=> setPassword(e.target.value)}
                        />
                    </div>
                    <Link to="/forgotpassword" id="reset-password">Esqueci minha senha</Link>

                    <button type="submit">Login</button>
                    <p>ou</p>
                    <Link to="/register">
                        Cadastre-se
                    </Link>
                </form>
            </section>
        </div>
    )
}