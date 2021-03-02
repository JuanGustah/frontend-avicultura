import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { FiEye, FiEyeOff } from 'react-icons/fi';

import api from '../../../services/api';

import './physical.css';

export default function Physical() {
    const [nome, setNome] = useState('');
    const [proprietario, setProprietario] = useState('');
    const [cpf, setCpf] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gaiola, setGaiola] = useState(false);
    const [termosDeUso, setTermosDeUso] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const history = useHistory();

    async function handleRegister(event) {
        event.preventDefault();

        const data = {
            nome,
            cpf,
            proprietario,
            gaiola,
            localizacao,
            termosDeUso,
            email,
            password
        }
        try {
            if (termosDeUso) {
                const response = await api.post('/cadastro-fisico', data);
                sessionStorage.setItem('token', response.data.responsejwt);
                history.push('/dashboard');
            } else {
                alert('É preciso concordar com os Termos de uso para continuar.');
            }
        }
        catch (error) {
            alert('Ocorreu um problema ao se cadastrar. Por favor,tente novamente')
        }
    }

    function handleCPFInput(inputCpf) {
        inputCpf = inputCpf.replace(/\D/g, "")
        inputCpf = inputCpf.replace(/^(\d{3})(\d)/, "$1.$2")
        inputCpf = inputCpf.replace(/\.(\d{3})(\d)/, ".$1.$2")
        inputCpf = inputCpf.replace(/\.(\d{3})(\d)/, ".$1-$2")
        setCpf(inputCpf)
    }

    return (
        <div className="physical-container">
            <h2>Criar Conta Física</h2>
            <form id="register_form" onSubmit={handleRegister} className="registerPyhsical">
                <div className="name">
                    <input type="text"
                        placeholder="Nome Fantasia"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        autoComplete="none"
                        required
                    />
                </div>
                <div className="owner">
                    <input type="text"
                        placeholder="Proprietário"
                        value={proprietario}
                        onChange={e => setProprietario(e.target.value)}
                        required
                    />
                </div>
                <div className="cpf">
                    <input type="text"
                        placeholder="CPF"
                        value={cpf}
                        onChange={e => setCpf(e.target.value)}
                        onKeyPress={e => handleCPFInput(e.target.value)}
                        required
                        pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                        title="Digite um CPF válido!"
                        maxLength="14"
                    />
                </div>
                <div className="email">
                    <input type="text"
                        placeholder="Email"
                        autoComplete="none"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="password">
                    <input type={showPassword ? 'text' : 'password'}
                        placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    {showPassword ? <FiEyeOff size={20} onClick={() => setShowPassword(!showPassword)} /> :
                        <FiEye size={20} onClick={() => setShowPassword(!showPassword)} />}

                </div>
                <div className="localization">
                    <input type="text"
                        placeholder="Localização"
                        value={localizacao}
                        onChange={e => setLocalizacao(e.target.value)}
                        required
                    />
                </div>
            </form>
            <div className="row">
                <div className="toggle">
                    <h3>Criação <br />de Gaiola</h3>
                    <label className="switch">
                        <input type="checkbox"
                            value={gaiola}
                            onChange={e => setGaiola(e.target.checked)}
                            form="register_form"
                        />
                        <span className="slider round"></span>
                    </label>
                    <h3>Criação <br />de Piso</h3>
                </div>
                <div className="authorization">
                    <input type="checkbox"
                        form="register_form"
                        name="auth_button"
                        value={termosDeUso}
                        onChange={e => setTermosDeUso(e.target.checked)}
                    />
                    <p>Concordo com os <b>termos de uso de dados</b></p>
                </div>
            </div>
        </div>
    )
}