import React, { useState } from 'react';

export default function GroupSidebar({ groups, onCreateGroup, onSelectGroup }) {
    const [showModal, setShowModal] = useState(false);
    const [groupName, setGroupName] = useState('');

    const handleCreateGroup = () => {
        if (groupName.trim()) {
            onCreateGroup(groupName);
            setGroupName('');
            setShowModal(false);
        }
    };

    return (
        <div className="group-sidebar">
            <h2>Groups</h2>
            <ul className="group-list">
                {groups.map((group, index) => (
                    <li key={index} onClick={() => onSelectGroup(group)}>
                        <div className="group-icon">{group[0].toUpperCase()}</div>
                        <span>{group}</span>
                    </li>
                ))}
            </ul>
            <button onClick={() => setShowModal(true)}>Create Group</button>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Create New Group</h3>
                        <input
                            type="text"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            placeholder="Group Name"
                        />
                        <button onClick={handleCreateGroup}>Create</button>
                        <button onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}
