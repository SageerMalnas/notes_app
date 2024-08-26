import React from 'react';
import './GroupSidebar.css';

export default function GroupSidebar({ groups, onSelectGroup }) {
    return (
        <div className="group-sidebar">
            <h2>Pocket Notes</h2>
            <ul className="group-list">
                {groups.map((group, index) => (
                    <li key={index} onClick={() => onSelectGroup(group)}>
                        <div className="group-icon">
                            {getGroupInitials(group.name)}
                        </div> 
                        <span>{group.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}


function getGroupInitials(name){
    const words = name.trim().split(' ');
    if(words.length === 1){
        return words[0].substring(0,2).toUpperCase();
    }else{
        return (words[0][0] + words[1][0]).toUpperCase();
    }
}