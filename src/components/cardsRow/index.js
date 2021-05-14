import React, { useEffect, useState } from 'react';

import './styles.css';

import DataCards from '../dataCards';
import api from '../../services/api';

export default function CardsRow() {
    const token = sessionStorage.getItem('token');
    const [cardMetadata, setcardMetadata] = useState([]);

    useEffect(() => {
        api.get('/dashboard/statusrow', {
            headers: {
                Authorization: token,
            }
        }).then(response => {
            setcardMetadata(response.data);
        });
    }, [token])



    return (
        <div className="cards-row">
            {cardMetadata ?
                cardMetadata.map((data, index) => (
                    <DataCards key={index} value={data.value} unit={data.unit} text={data.text} />
                ))
                :
                null
            }
            {/* <DataCards value={20} unit={""} text={"Ovos inseridos"} /> */}
        </div>
    )
}