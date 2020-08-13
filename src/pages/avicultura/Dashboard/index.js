import React from 'react';
import {FiPower} from 'react-icons/fi';
import {useHistory} from 'react-router-dom'
import BuildingImg from '../../../assets/building.png'
import './styles.css'

export default function Dashboard(){
    const history=useHistory();

    function logoff(){
        localStorage.clear();
        history.push('/');
    }
    return(
        <div className="dashboard-container">
            <div className="content">
                <header>
                    <h2>Dashboard</h2>
                    <button onClick={logoff}>
                        <FiPower color={'#fff'} size={20}/>
                    </button>
                </header>
                <div className="container"> 
                    <img src={BuildingImg} alt="Construindo"/>
                    <h2 style={{color:"#363636"}}>Em construção...</h2>
                </div>
            </div>
        </div>
    )
}