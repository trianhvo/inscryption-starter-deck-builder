import React, { useState, useEffect } from 'react';
import { cardNames } from '../assets/cards/cardsList';
import './CardSelection.css';

function CardSelection({ onSubmit, n, onSelectionChange }) {
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        onSelectionChange(selected.length);
    }, [selected, onSelectionChange]);

    const handleSelect = (card) => {
        setSelected((prev) => {
            if (prev.includes(card)) {
                return prev.filter(c => c !== card);
            } else {
                if (prev.length < n * 2) {
                    return [...prev, card];
                } else {
                    alert(`You can only select up to ${n * 2} cards.`);
                    return prev;
                }
            }
        });
    };

    const handleSubmit = () => {
        if (selected.length >= n + 3) {
            onSubmit(selected);
        } else {
            alert(`Please select at least ${n + 3} cards.`);
        }
    };

    return (
        <div>
            <div className="card-list">
                {cardNames.map((card) => (
                    <div
                        key={card}
                        className={`card-item ${selected.includes(card) ? 'selected' : ''}`}
                        onClick={() => handleSelect(card)}
                    >
                        <img src={require(`../assets/cards/cardImages/${card}.png`)} alt={card} />
                        <p>{card.replace('_', ' ')}</p>
                    </div>
                ))}
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default CardSelection;
