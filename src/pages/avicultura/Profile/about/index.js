import React, { useState, useEffect } from 'react';
import { FiPower, FiActivity, FiUserCheck, FiSmile } from 'react-icons/fi';
import { useHistory, Link } from 'react-router-dom'

import logoImg from '../../../../assets/chicken.svg';
import logoIFPE from '../../../../assets/logo_ifpe.png';
import logoUFAPE from '../../../../assets/logo_ufape.png';
import logoUNAME from '../../../../assets/logo_uname.png';
import './styles.css'

export default function About() {
    const history = useHistory();

    useEffect(() => {
        document.title = "Perfil: Sobre Nós - Avicultura"
    }, []);

    function logoff() {
        localStorage.clear();
        sessionStorage.clear();
        history.push('/');
    }
    return (
        <div className="about-container">
            <div className="content">
                <header>
                    <h2>Sobre Nós</h2>
                    <button onClick={logoff}>
                        <FiPower color={'#fff'} size={20} />
                    </button>
                </header>
                <div className="container">
                    <div className="logo">
                        <img src={logoImg} alt="Imagem Logo" />
                    </div>
                    <p className="description">O projeto AvaliaOvo é um sistema web voltado para produtores de Galinhas Poedeiras
                    visando a automatização do processo de análise dos ovos, permitindo uma
                    sistematização desses valores para tomar medidas cabíveis no mundo real.</p>
                    <h3>Nossa visão e objetivos</h3>
                    <div className="list">
                        <div className="item">
                            <div className="icon-bg">
                                <FiUserCheck color={"#fff"} size={40} />
                            </div>
                            <p>Para auxiliar os mais diversos avicultores, em especial os pequenos
                            avicultores, o sistema do avaliaOvo busca entregar a melhor experiência
                            com o intuito de melhorar a análise dos ovos.</p>
                        </div>
                        <div className="item">
                            <div className="icon-bg">
                                <FiSmile color={"#fff"} size={40} />
                            </div>
                            <p>Para facilitar o processo de sistematização e análise posteriora dos dados,
                            o sistema busca trazer uma interface amigável e de fácil manuseio,
                            contendo um guia de uso inclusa.</p>
                        </div>
                        <div className="item">
                            <div className="icon-bg">
                                <FiActivity color={"#fff"} size={40} />
                            </div>
                            <p>Para comparar dados e analisar a possível melhora ou piora dos valores
                            analisados, o sistema dispões de diversas formas de visualizações, em gráficos
                            e em dados abertos.</p>
                        </div>
                    </div>
                    <h3>Nossa equipe</h3>
                    <div className="list-grid">
                        <div className="item">
                            <h4>Juan Gustavo</h4>
                            <p>Ex-aluno do IFPE Campus Garanhuns</p>
                        </div>
                        <div className="item">
                            <h4>Luís Guilherme</h4>
                            <p>Ex-aluno do IFPE Campus Garanhuns</p>
                        </div>
                        <div className="item">
                            <h4>Jean Araújo</h4>
                            <p>Professor de Ciências da Computação na UFAPE</p>
                        </div>
                        <div className="item">
                            <h4>Danilo Pereira</h4>
                            <p>Professor de Zootecnia na UFAPE</p>
                        </div>
                    </div>
                    <h3>Colaboradores</h3>
                    <div className="list-horizontal">
                        <img src={logoIFPE} alt="logo do IFPE" className="ifpe_logo" />
                        <img src={logoUFAPE} alt="logo da UFAPE" className="ufape_logo" />
                        <img src={logoUNAME} alt="logo da grupo de pesquisa UNAME" className="uname_logo" />
                    </div>
                </div>
            </div>
        </div>
    )
}