import React, { useEffect } from 'react';
import { FiPower } from 'react-icons/fi';
import { useHistory } from 'react-router-dom'

import './styles.css'

import CardsRow from '../../../components/cardsRow';
import ChartsContainer from '../../../components/chartsContainer';

export default function Dashboard() {
    const history = useHistory();

    function logoff() {
        localStorage.clear();
        sessionStorage.clear();
        history.push('/');
    }
    useEffect(() => {
        document.title = "Dashboard - Avicultura"
    }, []);
    return (
        <div className="dashboard-container">
            <div className="content">
                <header>
                    <h2>Dashboard</h2>
                    <button onClick={logoff}>
                        <FiPower color={'#fff'} size={20} />
                    </button>
                </header>
                <CardsRow />
                <ChartsContainer />
            </div>
        </div>
    )
}