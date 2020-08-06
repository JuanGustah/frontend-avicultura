import React from 'react';
import {useHistory,Route,Switch} from 'react-router-dom'
import {FiCornerUpLeft} from 'react-icons/fi'

import './register.css';
import Chooser from './chooser';
import Legal from './legal';
import Physical from './physical';

export default function Register(){
    const history= useHistory();
    const path=window.location.pathname;

    return(
        <div className="register">
            <button onClick={history.goBack}>
                    <FiCornerUpLeft/>
                    <p>Voltar</p>
            </button>
        <div className="register-container">
            <div className="content">
                <Switch>
                    <Route path="/register" exact component={Chooser}/>
                    <Route path="/register/legal" component={Legal}/>
                    <Route path="/register/physical" component={Physical}/>
                </Switch>
            </div>
        </div> 
        { path==="/register" ? null : 
        <div className="button_row">
            <button type="submit" form="register_form">
                Cadastrar
            </button>
        </div> 
        }
        </div>
    )
}