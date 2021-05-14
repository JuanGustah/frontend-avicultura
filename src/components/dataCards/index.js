import React from 'react';

import './styles.css';

export default function DataCards({ value, unit, text }) {
    return (
        <div className="card-container">
            <h1>{Number.isInteger(value) ? value : Number.parseFloat(value).toFixed(2)}{unit ? unit : null}</h1>
            <p>{text}</p>
        </div>
    )
}