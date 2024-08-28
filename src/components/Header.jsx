import React from 'react';
import './Header.css';

export default function Header({ selectedGroup }) {
    return (
        <div className="header">
            <div className='group-icon'>{getGroupInitials(selectedGroup.name)}</div>
            <h1>{selectedGroup ? selectedGroup.name : 'Select a Group'}</h1>
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