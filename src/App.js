// src/App.js
import React, { useState } from 'react';
import Wheel from './components/Wheel';
import Note from './components/Note';
import CardInput from './components/CardInput';
import OuroborosRoll from './components/OuroborosRoll';
import './App.css';

function App() {
    const [step, setStep] = useState(1);
    const [n, setN] = useState(null);
    const [cards, setCards] = useState([]);
    const [spins, setSpins] = useState([]);
    const [messages, setMessages] = useState([]);
    const [isOuroborosSpun, setIsOuroborosSpun] = useState(false);
    const [isOuroboros, setIsOuroboros] = useState(false);
    const [ouroborosDeath, setOuroborosDeath] = useState(null);
    const [firstSpinCompleted, setFirstSpinCompleted] = useState(false);

    const handleWheelEnd = (value) => {
        setN(value);
        setMessages([...messages, `The starter deck has ${value} cards.`]);
        setStep(2);
    };

    const handleCardSubmit = (cardList) => {
        const defaultCards = ['Ouroboros', ...cardList];
        setCards(defaultCards);
        setStep(3);
    };

    const handleSpinEnd = (value) => {
        if (value === 'Ouroboros') {
            setIsOuroboros(true);
            setIsOuroborosSpun(true);
            setCards(cards.filter(card => card !== 'Ouroboros'));
            setMessages([...messages, `${value} card added`]);
        } else {
            setSpins([...spins, value]);
            setMessages([...messages, `${value} card added`]);
        }
        setFirstSpinCompleted(true);
        if (spins.length + 1 >= (n - 1)) {
            setStep(4); // Move to step 4 to finalize
        }
    };

    const handleOuroborosChoose = (value) => {
        setOuroborosDeath(value);
        setMessages([...messages, `Ouroboros's death: ${value}`]);
        setIsOuroboros(false);
    };

    return (
        <div className="App">
            <div className="left-panel">
                {step === 1 && <Wheel options={[3, 4, 5]} onSpinEnd={handleWheelEnd} />}
                {step === 2 && <CardInput n={n} onSubmit={handleCardSubmit} />}
                {step === 3 && spins.length < (n - 1) && (
                    <Wheel
                        options={cards}
                        onSpinEnd={handleSpinEnd}
                        spinDuration={0.5}
                        forceFirstSpinToOuroboros={!firstSpinCompleted}
                    />
                )}
                {step === 4 && isOuroboros && (
                    <OuroborosRoll onChoose={handleOuroborosChoose} forceFirstSpinToOuroboros={true}/>
                )}
                {step === 4 && !isOuroboros && (
                    <p>Spinning complete. {isOuroborosSpun ? 'Have fun with the Ouroboros card!' : 'No Ouroboros card was spun.'}</p>
                )}
            </div>
            <div className="right-panel">
                <Note messages={messages} />
            </div>
        </div>
    );
}

export default App;
