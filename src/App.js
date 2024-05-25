import React, { useState } from 'react';
import Wheel from './components/Wheel';
import Note from './components/Note';
import CardSelection from './components/CardSelection';
import OuroborosRoll from './components/OuroborosRoll';
import './App.css';

function App() {
    const [step, setStep] = useState(1);
    const [n, setN] = useState(null);
    const [cards, setCards] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);
    const [spins, setSpins] = useState([]);
    const [messages, setMessages] = useState([]);
    const [isOuroborosSpun, setIsOuroborosSpun] = useState(false);
    const [isOuroboros, setIsOuroboros] = useState(false);
    const [ouroborosDeath, setOuroborosDeath] = useState(null);
    const [cardsChosen, setCardsChosen] = useState(0);

    const handleWheelEnd = (value) => {
        setN(parseInt(value, 10));
        if (!messages.some(msg => msg.includes('The starter deck has'))) {
            setMessages(prevMessages => [...prevMessages, `The starter deck has ${value} cards.`]);
        }
        setStep(2);
    };

    const handleCardSelection = (cardList) => {
        setSelectedCards(cardList);
        setCards(cardList);
        setStep(3);
    };

    const handleSpinEnd = (value) => {
        setSpins(prevSpins => {
            const updatedSpins = [...prevSpins, value];
            setMessages(prevMessages => [...prevMessages, `${value} card added`]);

            if (value === 'Ouroboros') {
                setIsOuroboros(true);
                setIsOuroborosSpun(true);
                setCards(cards.filter(card => card !== 'Ouroboros'));
            }

            const totalSpins = updatedSpins.length;
            if (totalSpins >= n) {
                setStep(4);
            }

            return updatedSpins;
        });
    };

    const handleOuroborosChoose = (value) => {
        setOuroborosDeath(value);
        setMessages(prevMessages => [...prevMessages, `Ouroboros's death: ${value}`]);
        setIsOuroboros(false);
        setSpins(prevSpins => {
            const updatedSpins = [...prevSpins, 'Ouroboros'];
            if (updatedSpins.length >= n) {
                setStep(4);
            } else {
                setStep(3);
            }
            return updatedSpins;
        });
    };

    const handleSelectionChange = (count) => {
        setCardsChosen(count);
    };

    const wheelOptions = isOuroborosSpun ? selectedCards.filter(card => card !== 'Ouroboros') : [...selectedCards, 'Ouroboros'];

    return (
        <div className="App">
            <div className="left-panel">
                {step === 1 && <Wheel options={[5, 6, 7, 8, 10]} onSpinEnd={handleWheelEnd} />}
                {step === 2 && <CardSelection onSubmit={handleCardSelection} n={n} onSelectionChange={handleSelectionChange} />}
                {step === 3 && spins.length < n && (
                    <Wheel
                        options={wheelOptions}
                        onSpinEnd={handleSpinEnd}
                        spinDuration={0.5}
                        forceFirstSpinToOuroboros={false}
                    />
                )}
                {step === 4 && isOuroboros && (
                    <OuroborosRoll onChoose={handleOuroborosChoose} />
                )}
                {step === 4 && !isOuroboros && (
                    <div>
                        <p>Spinning complete. {isOuroborosSpun ? 'Have fun with the Ouroboros card!' : 'No Ouroboros card was spun.'}</p>
                        <p><a href='https://inscryption-save-editor.vercel.app/' rel="noreferrer" target='_blank'>Let's go to edit save</a></p>
                    </div>
                )}
            </div>
            <div className="right-panel">
                <Note messages={messages} cardsChosen={cardsChosen} n={n} step={step} />
            </div>
        </div>
    );
}

export default App;
