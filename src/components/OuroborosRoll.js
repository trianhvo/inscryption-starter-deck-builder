import React, { useState } from 'react';

function OuroborosRoll({ onChoose }) {
    const [rolls, setRolls] = useState([]);
    const [chosen, setChosen] = useState(null);

    const handleRoll = () => {
        if (rolls.length < 3) {
            const newRoll = Math.floor(Math.random() * 100) + 1;
            setRolls([...rolls, newRoll]);
        }
    };

    const handleChoose = (value) => {
        setChosen(value);
        onChoose(value);
    };

    return (
        <div>
            <button onClick={handleRoll} disabled={rolls.length >= 3 || chosen !== null}>Roll</button>
            {rolls.map((roll, index) => (
                <p key={index}>Roll {index + 1}: {roll}</p>
            ))}
            {rolls.length > 0 && !chosen && <button onClick={() => handleChoose(rolls[rolls.length - 1])}>Choose</button>}
            {chosen && <p>Chosen: {chosen}</p>}
        </div>
    );
}

export default OuroborosRoll;
