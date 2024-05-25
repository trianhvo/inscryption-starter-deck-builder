// src/components/Note.js
import React from 'react';

function Note ({ messages }) {
    return (
        <div className="note">
            {messages.map((msg, index) => <p key={index}>{msg}</p>)}
        </div>
    );
}

export default Note;
