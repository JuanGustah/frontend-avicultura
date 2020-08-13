import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import {FiEye,FiEyeOff} from 'react-icons/fi'
import api from '../../../services/api';
import './legal.css';

export default function Legal(){
    const [nomeFantasia,setNomeFantasia] =useState('');
    const [razaoSocial,setRazaoSocial] =useState('');
    const [proprietario,setProprietario] =useState('');
    const [cnpj,setCnpj] =useState('');
    const [localizacao,setLocalizacao] =useState('');
    const [email,setEmail] =useState('');
    const [password,setPassword] =useState('');
    const [gaiola,setGaiola] =useState(false);
    const [termosDeUso,setTermosDeUso] =useState(false);
    const [showPassword,setShowPassword]=useState(false);
    const history=useHistory();

    async function handleRegister(event){
        const data={
            nomeFantasia,
            razaoSocial,
            cnpj,
            proprietario,
            gaiola,
            localizacao,
            termosDeUso,
            email,
            password
        }
        try{
            await api.post('cadastro',data);
            alert('Granja Cadastrada com Sucesso!');
            history.push("/");
        }
        catch(error){
            if(error.message.includes('428')){
                alert('É necessário aceitar os termos de uso para se cadastrar no sistema')
            }
            else{
                alert('Ocorreu um problema ao se cadastrar. Por favor,tente novamente')
            }
        }
    }
    function handleCNPJInput(inputCnpj){
        inputCnpj=inputCnpj.replace(/\D/g,"")
        inputCnpj=inputCnpj.replace(/^(\d{2})(\d)/,"$1.$2")
        inputCnpj=inputCnpj.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3")
        inputCnpj=inputCnpj.replace(/\.(\d{3})(\d)/,".$1/$2")
        inputCnpj=inputCnpj.replace(/(\d{4})(\d)/,"$1-$2")
        setCnpj(inputCnpj)       
    }
    return(
        <div className="legal-container">
            <h2>Criar Conta Jurídica</h2>
            <form onSubmit={handleRegister} id="register_form">
                <div className="name">
                    <input type="text" 
                    placeholder="Nome Fantasia"
                    value={nomeFantasia}
                    onChange={e=> setNomeFantasia(e.target.value)}
                    required
                    />
                </div>
                <div className="social_reason">
                    <input type="text" 
                    placeholder="Razão Social"
                    value={razaoSocial}
                    onChange={e=> setRazaoSocial(e.target.value)}
                    required
                    />
                </div>
                <div className="email">
                    <input type="text" 
                    placeholder="Email"
                    value={email}
                    onChange={e=> setEmail(e.target.value)}
                    required
                    />
                </div>
                 <div className="password">
                    <input type={showPassword?'text':'password'}
                    placeholder="Senha"
                    value={password}
                    onChange={e=> setPassword(e.target.value)}
                    required
                    />
                    {showPassword? <FiEyeOff size={20} onClick={()=>setShowPassword(!showPassword)}/>: 
                    <FiEye size={20} onClick={()=>setShowPassword(!showPassword)}/> }
                    
                </div>
                <div className="owner">
                    <input type="text" 
                    placeholder="Proprietário"
                    value={proprietario}
                    onChange={e=> setProprietario(e.target.value)}
                    required
                    />
                </div>
                <div className="cnpj">
                    <input type="text" 
                    placeholder="CNPJ"
                    value={cnpj}
                    onChange={e=> setCnpj(e.target.value)}
                    onKeyPress={e=>handleCNPJInput(e.target.value)}
                    required
                    pattern="\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}"
                    title="Digite o formato correto do CNPJ!"
                    maxLength="18"
                    />
                </div>
                <div className="localization">
                    <input type="text" 
                    placeholder="Localização"
                    value={localizacao}
                    onChange={e=> setLocalizacao(e.target.value)}
                    required
                    />
                </div>
                <div className="toggle">
                    <h3>Criação <br/>de Gaiola</h3>
                    <label className="switch">
                    <input type="checkbox"
                    value={gaiola}
                    onChange={e=> setGaiola(e.target.checked)}
                    />
                    <span className="slider round"></span>
                    </label>
                    <h3>Criação <br/>de Piso</h3>
                </div>
            </form>
            <div className="authorization">
                <input type="checkbox" 
                form="register_form"
                name="auth_button"
                value={termosDeUso}
                onChange={e=> setTermosDeUso(e.target.checked)}
                />
                <p>Concordo com os <b>termos de uso de dados</b></p>
            </div>        
        </div>
    )
}