import React from 'react';

function Note ({ messages, cardsChosen, n, step }) {
    return (
        <div>
            {messages.map((message, index) => {
                const parts = message.split(' ');
                const cardNameIndex = parts.findIndex(part => part.toLowerCase() === 'card');
                if (cardNameIndex > 0) {
                    const cardName = parts.slice(0, cardNameIndex).join(' ');
                    const restMessage = parts.slice(cardNameIndex).join(' ');
                    return (
                        <p key={index}>
                            <strong>{cardName}</strong> {restMessage}
                        </p>
                    );
                }
                return <p key={index}>{message}</p>;
            })}
            {step === 2 && (
                <>
                    <p>The starter deck has {n} cards.</p>
                    <p>You must pick {n + 3} to {n * 2} cards</p>
                    <p>Cards chosen: {cardsChosen}</p>
                </>
            )}
        </div>
    );
}

export default Note;
