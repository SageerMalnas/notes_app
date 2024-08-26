import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './NoteInput.css';
import { faForward } from '@fortawesome/free-solid-svg-icons';

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
                        <small>{new Date(note.created).toLocaleString()}</small>
                    </li>
                ))}
            </ul>
            <div className="input-content">
                <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Enter your text here..."
                />
                <button onClick={handleSend} disabled={!note.trim()}>
                    <FontAwesomeIcon icon={faForward} />
                </button>
            </div>
        </div>
    );
}
