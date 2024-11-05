import React from 'react';
import './Card.css';

const Card = ({ id, symbol, flipped, onClick }) => {
  return (
    <div className={`card ${flipped ? 'flipped' : ''}`} onClick={onClick}>
      <div className="card-content">
        {flipped ? <span className="symbol">{symbol}</span> : <span className="back">?</span>}
      </div>
    </div>
  );
};

export default Card;
