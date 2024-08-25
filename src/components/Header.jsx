import React from 'react';

export default function Header({ selectedGroup }) {
    return (
        <header className="header">
            <h1>{selectedGroup ? selectedGroup : 'Select a Group'}</h1>
        </header>
    );
}
