import React, { useEffect, useRef, useState } from 'react';
import { FiPower, FiEdit, FiList, FiGlobe, FiHelpCircle } from 'react-icons/fi';
import { useHistory, Link } from 'react-router-dom'
import Farmer from '../../../../assets/farmer.svg';
import api from '../../../../services/api';

import './styles.css'

export default function Profile() {
    const [nome, setNome] = useState('');
    const [razaoSocial, setRazaoSocial] = useState('');
    const [proprietario, setProprietario] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [cpf, setCpf] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [gaiola, setGaiola] = useState(false);

    const [isGranjaJuridica, setIsGranjaJuridica] = useState(false);
    const [formChanges, setFormChanges] = useState([]);

    const buttonSubmit = useRef(null);

    const history = useHistory();
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        document.title = "Perfil: Editar - Avicultura"
    }, []);

    function logoff() {
        localStorage.clear();
        sessionStorage.clear();
        history.push('/');
    }
    useEffect(() => {
        api.get('/profile/getgranjadata', {
            headers: {
                Authorization: token,
            }
        }).then(response => {
            if (response.data.type) {
                setIsGranjaJuridica(response.data.type);
                setNome(response.data.granjaJuridica.nomeFantasia);
                setRazaoSocial(response.data.granjaJuridica.razaoSocial);
                setProprietario(response.data.granjaJuridica.proprietario);
                setLocalizacao(response.data.granjaJuridica.localizacao);
                setCnpj(response.data.granjaJuridica.cnpj);

                response.data.granjaJuridica.gaiola ? setGaiola(true) : setGaiola(false);
            } else {
                setNome(response.data.granjaJuridica.nome);
                setProprietario(response.data.granjaJuridica.proprietario);
                setLocalizacao(response.data.granjaJuridica.localizacao);
                setCpf(response.data.granjaJuridica.CPF);

                response.data.granjaJuridica.gaiola ? setGaiola(true) : setGaiola(false);
            }
        })
    }, [token])
    async function handleUpdate(event) {
        event.preventDefault();

        if (formChanges !== {}) {
            try {
                await api.put(`/profile/update/${isGranjaJuridica}`, formChanges, {
                    headers: {
                        Authorization: token,
                    }
                })
                console.log(formChanges);
                alert('Lote atualizado com Sucesso!');
            } catch (error) {
                console.log(error);
                alert('Houve um problema ao atualizar o ovo,tente novamente mais tarde');
            }
        }
    }
    function handleFormChanges(event) {
        if (event.target.name === "gaiola") {
            setFormChanges({ ...formChanges, [event.target.name]: event.target.checked });
        } else {
            setFormChanges({ ...formChanges, [event.target.name]: event.target.value });
        }

        buttonSubmit.current.disabled = false;
    }
    function handleCNPJInput(inputCnpj) {
        inputCnpj = inputCnpj.replace(/\D/g, "")
        inputCnpj = inputCnpj.replace(/^(\d{2})(\d)/, "$1.$2")
        inputCnpj = inputCnpj.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        inputCnpj = inputCnpj.replace(/\.(\d{3})(\d)/, ".$1/$2")
        inputCnpj = inputCnpj.replace(/(\d{4})(\d)/, "$1-$2")
        setCnpj(inputCnpj)
    }
    function handleCPFInput(inputCpf) {
        inputCpf = inputCpf.replace(/\D/g, "")
        inputCpf = inputCpf.replace(/^(\d{3})(\d)/, "$1.$2")
        inputCpf = inputCpf.replace(/\.(\d{3})(\d)/, ".$1.$2")
        inputCpf = inputCpf.replace(/\.(\d{3})(\d)/, ".$1-$2")
        setCpf(inputCpf)
    }
    return (
        <div className="edit-container">
            <div className="content">
                <header>
                    <h2>Minha Granja</h2>
                    <button onClick={logoff}>
                        <FiPower color={'#fff'} size={20} />
                    </button>
                </header>
                <form onSubmit={handleUpdate} onChange={handleFormChanges} id="update_form" className="container" autoComplete="off">
                    <div className="v-row">
                        <div className="img-container">
                            <img src={Farmer} alt="add Imagem" />
                        </div>
                        {isGranjaJuridica ?
                            <div className="input">
                                <input type="text"
                                    name="nomeFantasia"
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}
                                    required
                                    style={{ marginRight: "1.5rem" }}
                                />
                                <input type="text"
                                    name="razaoSocial"
                                    value={razaoSocial}
                                    onChange={e => setRazaoSocial(e.target.value)}
                                    required
                                />
                            </div>
                            :
                            <div className="input">
                                <input type="text"
                                    name="nome"
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}
                                    required
                                />
                            </div>
                        }
                        <h4 className="badge">{isGranjaJuridica ? "Granja Jurídica" : "Granja Física"}</h4>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="input">
                                <label htmlFor="dono">Proprietário</label>
                                <input type="text"
                                    name="proprietario"
                                    id="dono"
                                    value={proprietario}
                                    onChange={e => setProprietario(e.target.value)}
                                    required
                                />
                            </div>
                            {isGranjaJuridica ?
                                <div className="input">
                                    <label htmlFor="cnpj">CNPJ</label>
                                    <input id="cnpj" type="text"
                                        name="cnpj"
                                        value={cnpj}
                                        onChange={e => setCnpj(e.target.value)}
                                        onKeyPress={e => handleCNPJInput(e.target.value)}
                                        required
                                        pattern="\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}"
                                        title="Digite um CNPJ válido!"
                                        maxLength="18"
                                    />
                                </div>
                                :
                                <div className="input">
                                    <label htmlFor="cpf">CPF</label>
                                    <input id="cpf" type="text"
                                        name="cpf"
                                        value={cpf}
                                        onChange={e => setCpf(e.target.value)}
                                        onKeyPress={e => handleCPFInput(e.target.value)}
                                        required
                                        pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                                        title="Digite um CPF válido!"
                                        maxLength="14"
                                    />
                                </div>
                            }
                        </div>
                        <div className="row">
                            <div className="input">
                                <label htmlFor="local">Localização</label>
                                <input type="text"
                                    name="localizacao"
                                    id="local"
                                    value={localizacao}
                                    onChange={e => setLocalizacao(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input gaiola">
                                <label htmlFor="gaiola">Granja de Gaiola</label>
                                <label className="container-checkbox">
                                    <input type="checkbox"
                                        name="gaiola"
                                        onChange={e => setGaiola(e.target.checked)}
                                        checked={gaiola}
                                    />
                                    <span className="checkmark"></span>
                                    <p>{gaiola ? "Sim" : "Não"}</p>
                                </label>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="row-button">
                    <button ref={buttonSubmit} type="submit" form="update_form" disabled>
                        Atualizar Dados
                    </button>
                </div>
            </div>
        </div>
    )
}