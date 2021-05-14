import React, { useState, useEffect } from 'react';
import { FiPower } from 'react-icons/fi';
import { useHistory, useParams, Link } from 'react-router-dom'

import './styles.css'

import api from '../../../../services/api';
import SectorSvg from '../../../../assets/sector_list_icon.svg'
import Paginator from '../../../../components/paginator'

export default function ListSector() {
    const history = useHistory();
    const { page } = useParams();
    const [lotesCadastrados, setLotesCadastrados] = useState([]);
    const [lotesPages, setLotesPages] = useState(1);
    const token = sessionStorage.getItem('token');

    function logoff() {
        localStorage.clear();
        sessionStorage.clear();
        history.push('/');
    }
    useEffect(() => {
        document.title = "Perfil: Listagem de Setores - Avicultura"
    }, []);
    useEffect(() => {
        api.get(`/perfil-lote/list-lotes?page=${page}`, {
            headers: {
                Authorization: token,
            }
        })
            .then(response => {
                setLotesCadastrados(response.data.lotes);
                setLotesPages(response.data.pages);
            })
    }, [page])
    return (
        <div className="list-container">
            <div className="content">
                <header>
                    <div>
                        <h2>Minha Granja</h2>
                        <h3>Listar Setores</h3>
                    </div>
                    <button onClick={logoff}>
                        <FiPower color={'#fff'} size={20} />
                    </button>
                </header>

                <div className="container">
                    <div className="collection">
                        {lotesCadastrados.map(lote => (
                            <div className="row" key={lote.lote_id}>
                                <div className="title">
                                    <img src={SectorSvg} alt="Setor Ícone" />
                                    <h4>Setor {lote.lote_id}</h4>
                                </div>
                                <div className="button-group">
                                    <Link to={`/profile/sector?lote=${lote.lote_id}&granja=${lote.granja_id}`}>
                                        <b>Detalhes / Editar</b>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Paginator src="/profile/list-sector/" pages={lotesPages} page={page} />
                </div>

            </div>
        </div>
        // <div className="list-container">
        //     <div className="content">
        //         <header>
        //             <div>
        //             <h2>Minha Granja</h2>
        //             <h2>Listar Setores</h2>
        //             </div>
        //             <button onClick={logoff}>
        //                 <FiPower color={'#fff'} size={20}/>
        //             </button>
        //         </header> 
        //         <div className="container">
        //             <h1>Granjas</h1>
        //         </div>
        //     </div>
        // </div>
    )
}