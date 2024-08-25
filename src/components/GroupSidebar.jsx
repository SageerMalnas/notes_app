import React from 'react';

export default function GroupSidebar({ groups, onSelectGroup }) {
    return (
        <div className="group-sidebar">
            <h2>Groups</h2>
            <ul className="group-list">
                {groups.map((group, index) => (
                    <li key={index} onClick={() => onSelectGroup(group)}>
                        <div className="group-icon">{group.name[0].toUpperCase()}</div> 
                        <span>{group.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
