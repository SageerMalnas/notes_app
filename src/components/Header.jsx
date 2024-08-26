import React from 'react';
import './Header.css';

export default function Header({ selectedGroup }) {
    return (
        <div className="header">
            <h1>{selectedGroup ? selectedGroup.name : 'Select a Group'}</h1>
        </div>
    );
}
