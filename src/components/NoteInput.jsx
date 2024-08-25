import React, { useState } from 'react';

export default function NoteInput({ onAddNote, selectedGroup }) {
    const [note, setNote] = useState('');

    const handleSend = () => {
        if (note.trim()) {
            onAddNote(note);
            setNote('');
        }
    };

    return (
        <div className="note-input-container">
            <ul className="note-list">
                {selectedGroup && selectedGroup.notes.map((note, index) => (
                    <li key={index}>
                        <p>{note.content}</p>
                        <small>Created: {new Date(note.created).toLocaleString()}</small>
                        {note.updated && <small>Updated: {new Date(note.updated).toLocaleString()}</small>}
                    </li>
                ))}
            </ul>
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
