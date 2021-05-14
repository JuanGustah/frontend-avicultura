import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import celebrationImg from '../../../../assets/correct.svg';

import './styles.css';
export default function Finalizar() {
    const history = useHistory();

    useEffect(() => {
        document.title = "Cadastro de Ovos - Avicultura"
    }, []);

    useEffect(() => {
        sessionStorage.removeItem('insertType');
        sessionStorage.removeItem('component');
        sessionStorage.removeItem('sessionId');
        sessionStorage.removeItem('eggQuantity');
        sessionStorage.removeItem('nextRoute');
        sessionStorage.removeItem('eggIndex');
        sessionStorage.removeItem('quantityFixed');

        setTimeout(() => {
            history.push('/egg');
        }, 3000)
    }, [history])
    return (
        <div className="end-container">
            <div className="container">
                <img src={celebrationImg} alt="Celebração" />
                <h1>Sucesso!</h1>
                <p>Os ovos inseridos foram <br /> registrados no sistema.</p>
            </div>
        </div>
    )
}