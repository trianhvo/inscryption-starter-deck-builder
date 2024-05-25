import React, { useState, useEffect } from 'react';
import { Wheel as CustomWheel } from 'react-custom-roulette';
import './Wheel.css';

function Wheel({ options = [], onSpinEnd, spinDuration = 0.5, forceFirstSpinToOuroboros }) {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);

    useEffect(() => {
        if (options.length === 0) {
            console.error('Options array is empty or undefined.');
        } else {
            console.log('Options for wheel:', options);
        }
    }, [options]);

    const handleSpin = () => {
        let selected;
        if (forceFirstSpinToOuroboros && options.includes('Ouroboros')) {
            selected = options.indexOf('Ouroboros'); // Force first spin to "Ouroboros"
        } else {
            selected = Math.floor(Math.random() * options.length);
        }
        if (selected < 0 || selected >= options.length || isNaN(selected)) {
            console.error('Selected index is invalid:', selected);
            return;
        }
        setPrizeNumber(selected);
        setMustSpin(true);
    };

    const data = options.map((option, index) => {
        if (!option || typeof option !== 'string') {
            console.error('Invalid option:', option, 'at index:', index);
        }
        return {
            option: option.toString(),
            style: { backgroundColor: 'white', textColor: 'black' }
        };
    });

    useEffect(() => {
        if (prizeNumber < 0 || prizeNumber >= data.length) {
            console.error('Prize number out of bounds:', prizeNumber);
        }
    }, [prizeNumber, data.length]);

    return (
        <div className="wheel-container">
            <CustomWheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={data}
                spinDuration={spinDuration}
                onStopSpinning={() => {
                    if (options[prizeNumber] === undefined) {
                        console.error('Invalid prizeNumber, options:', options, 'prizeNumber:', prizeNumber);
                        return;
                    }
                    setMustSpin(false);
                    onSpinEnd(options[prizeNumber]);
                }}
            />
            <button onClick={handleSpin} disabled={mustSpin}>Spin</button>
        </div>
    );
}

export default Wheel;
