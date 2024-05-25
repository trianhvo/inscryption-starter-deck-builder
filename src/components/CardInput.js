// src/components/CardInput.js
import React, { useState } from 'react';

function CardInput({ n, onSubmit }) {
    const [cards, setCards] = useState(Array(n * 2).fill(''));

    const handleChange = (index, value) => {
        const newCards = [...cards];
        newCards[index] = value;
        setCards(newCards);
    };

    const handleSubmit = () => {
        const filledCards = cards.filter(card => card.trim() !== '');
        if (filledCards.length >= n + 3) {
            onSubmit(filledCards);
        } else {
            alert(`Please enter at least ${n + 3} card names.`);
        }
    };

    return (
        <div>
            {cards.map((card, index) => (
                <input
                    key={index}
                    value={card}
                    onChange={(e) => handleChange(index, e.target.value)}
                    placeholder={`Card ${index + 1}`}
                />
            ))}
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default CardInput;
