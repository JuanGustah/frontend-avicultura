import React,{useState} from 'react';

import './physical.css';

export default function Physical(){
    const [nome,setNome] =useState('');
    const [proprietario,setProprietario] =useState('');
    const [cpf,setCpf] =useState('');
    const [localizacao,setLocalizacao] =useState('');
    const [gaiola,setGaiola] =useState(false);
    const [termosDeUso,setTermosDeUso] =useState(false);

    return(
        <div className="legal-container">
            <h2>Criar Conta Física</h2>
            <form id="register_form">
                <div className="name">
                    <input type="text" 
                    placeholder="Nome"
                    value={nome}
                    onChange={e=> setNome(e.target.value)}
                    />
                </div>
                <div className="cpf">
                    <input type="text" 
                    placeholder="CPF"
                    value={cpf}
                    onChange={e=> setCpf(e.target.value)}
                    />
                </div>
                <div className="email">
                    <input type="text" 
                    placeholder="Email"
                    />
                </div>
                 <div className="password">
                    <input type="text" 
                    placeholder="Senha"
                    />
                </div>
                <div className="owner">
                    <input type="text" 
                    placeholder="Proprietário"
                    value={proprietario}
                    onChange={e=> setProprietario(e.target.value)}
                    />
                </div>
                <div className="localization">
                    <input type="text" 
                    placeholder="Localização"
                    value={localizacao}
                    onChange={e=> setLocalizacao(e.target.value)}
                    />
                </div>
            </form>
            <div className="toggle">
                    <h3>Criação <br/>de Gaiola</h3>
                    <label className="switch">
                    <input type="checkbox"
                    value={gaiola}
                    onChange={e=> setGaiola(e.target.checked)}
                    form="register_form"
                    />
                    <span className="slider round"></span>
                    </label>
                    <h3>Criação <br/>de Piso</h3>
                </div>
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