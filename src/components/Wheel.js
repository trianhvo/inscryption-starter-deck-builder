// src/components/Wheel.js
import React, { useState } from 'react';
import { Wheel as CustomWheel } from 'react-custom-roulette';
import './Wheel.css';

function Wheel({ options, onSpinEnd, spinDuration = 0.5, forceFirstSpinToOuroboros }) {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);

    const handleSpin = () => {
        let selected;
        if (forceFirstSpinToOuroboros) {
            selected = options.indexOf('Ouroboros'); // Force first spin to "Ouroboros"
        } else {
            selected = Math.floor(Math.random() * options.length);
        }
        setPrizeNumber(selected);
        setMustSpin(true);
    };

    const data = options.map((option) => ({
        option,
        style: { backgroundColor: 'white', textColor: 'black' }
    }));

    return (
        <div className="wheel-container">
            <CustomWheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={data}
                spinDuration={spinDuration}
                onStopSpinning={() => {
                    setMustSpin(false);
                    onSpinEnd(options[prizeNumber]);
                }}
            />
            <button onClick={handleSpin} disabled={mustSpin}>Spin</button>
        </div>
    );
}

export default Wheel;
