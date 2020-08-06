import React from 'react';
import {FiPower} from 'react-icons/fi';
import './styles.css'
import {useHistory} from 'react-router-dom'
export default function Profile(){
    const history=useHistory();
    function logoff(){
        localStorage.clear();
        history.push('/');
    }
    return(
        <div className="profile-container">
            <div className="content">
                <header>
                    <h2>Minha Granja</h2>
                    <button onClick={logoff}>
                        <FiPower color={'#fff'} size={20}/>
                    </button>
                </header> 
                <div className="container">
                    
                </div>
            </div>
        </div>
    )
}