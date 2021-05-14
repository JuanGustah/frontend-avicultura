import React, { useState, useEffect } from 'react';
import logoImg from '../../assets/chicken.svg';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import background from '../../assets/egground.svg'
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api'

import './logon.css'

export default function Logon() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const history = useHistory();

    useEffect(() => {
        document.title = "Avicultura"
    }, []);

    async function handleLogin(event) {
        event.preventDefault();
        const data = {
            email,
            password
        }
        try {
            const response = await api.post('login', data);
            sessionStorage.setItem('token', response.data.responsejwt);
            history.push('/dashboard');
        }
        catch (error) {
            if (error.message.includes('400')) {
                alert('Usuário não confirmou email,verifique sua caixa de mensagem e confirme seu email antes de entrar no sistema.')
            } else {
                alert('Email e senha não correspondem a nenhuma granja cadastrada. ')
            }
        }
    }

    return (
        <div className="login-container">
            <img src={background} alt="ovo background" className="eggground" />
            <section className="form" >
                <img src={logoImg} alt="Imagem Logo" />
                <form onSubmit={handleLogin}>
                    <h1>Bem vindo de volta</h1>
                    <h3>Faça seu Login para continuar</h3>

                    <div className="email">
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="password">
                        <input type={showPassword ? 'text' : 'password'}
                            placeholder="Senha"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        {showPassword ? <FiEyeOff size={20} onClick={() => setShowPassword(!showPassword)} /> :
                            <FiEye size={20} onClick={() => setShowPassword(!showPassword)} />}
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