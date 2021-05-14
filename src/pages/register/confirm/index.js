import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom'

import celebrationImg from '../../../assets/celebration.svg';

import api from '../../../services/api';
import './styles.css';
export default function Confirm() {
    const { id } = useParams();
    const type = localStorage.getItem("TipoCadastro");
    const history = useHistory();

    useEffect(() => {
        document.title = "Registrar - Avicultura"
    }, []);

    useEffect(() => {
        if (type === "juridico") {
            api.post('/confirmar-juridico', { id }).then(
                localStorage.clear()
            )
            setTimeout(() => {
                history.push("/");
            }, 2000)
        } else {
            api.post('/confirmar-fisico', { id }).then(
                localStorage.clear()
            )
            setTimeout(() => {
                history.push("/");
            }, 2000)
        }
    }, [id, type, history])
    return (
        <div className="confirm-container">
            <div className="container">
                <img src={celebrationImg} alt="Celebração" />
                <h1>Email confirmado!</h1>
                <p>Espere e alguns instantes você entrará no sistema....</p>
            </div>
        </div>
    )
}