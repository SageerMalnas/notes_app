import React from 'react';

export default function Header({ selectedGroup }) {
    return (
        <div className="header">
            {/* Only render the group name, which should be a string */}
            <h1>{selectedGroup ? selectedGroup.name : 'Select a Group'}</h1>
        </div>
    );
}
