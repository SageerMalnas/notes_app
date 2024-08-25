import React, { useState } from 'react';

export default function NoteInput({ onAddNote }) {
    const [note, setNote] = useState('');

    const handleSend = () => {
        if (note.trim()) {
            onAddNote(note);
            setNote('');
        }
    };

    return (
        <div className="note-input-container">
            <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Type a note..."
            />
            <button onClick={handleSend} disabled={!note.trim()}>
                Send
            </button>
        </div>
    );
}
