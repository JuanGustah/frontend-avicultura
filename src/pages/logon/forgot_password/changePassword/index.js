import React from 'react'

import './change.css'

export default function ChangePassword(){
    return(
    <div className="change-container">
        <div className="container">              
            <h2>Email confirmado! <br/> Agora vamos mudar sua senha...</h2>
            <form >
            <h3>Insira sua nova senha</h3>
            <input type="text"/>
            <h3>Repita sua senha</h3>
            <input type="text"/>
            <div className="button_row">
            <button type="submit">Finalizar</button>
            </div>
            </form>
        </div>
    </div>

    )
}