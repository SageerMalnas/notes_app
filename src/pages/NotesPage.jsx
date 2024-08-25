import React, { useState, useEffect } from 'react';
import GroupSidebar from '../components/GroupSidebar';
import NoteInput from '../components/NoteInput';
import Header from '../components/Header';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function NotesPage() {
    const [groups, setGroups] = useLocalStorage('groups', []);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');

    useEffect(() => {
        if (groups.length > 0 && !selectedGroup) {
            setSelectedGroup(groups[0]);
        }
    }, [groups]);

    const handleAddNote = (content) => {
        if (!selectedGroup) return;

        const timestamp = new Date().toISOString();
        const newNote = {
            content,
            created: timestamp,
            updated: null
        };

        const updatedGroups = groups.map((group) => {
            if (group.name === selectedGroup.name) {
                return {
                    ...group,
                    notes: [...group.notes, newNote]
                };
            }
            return group;
        });

        setGroups(updatedGroups);
        setSelectedGroup(updatedGroups.find(group => group.name === selectedGroup.name));
    };

    const handleCreateGroup = () => {
        if (newGroupName.trim()) {
            const defaultNote = {
                content: `Another productive way to use this tool to begin a 
                daily writing routine. One way is to generate a random 
                paragraph with the intention to try to rewrite it while still
                 keeping the original meaning. The purpose here is to just get 
                 the writing started so that when the writer goes onto their 
                 day's writing projects, words are already flowing from their 
                 fingers. ${newGroupName}.`,
                created: new Date().toISOString(),
                updated: null
            };

            const newGroup = {
                name: newGroupName,
                notes: [defaultNote]
            };

            const updatedGroups = [...groups, newGroup];
            setGroups(updatedGroups);
            setSelectedGroup(newGroup);
            setNewGroupName('');
            setShowModal(false);
        }
    };

    const handleSelectGroup = (group) => {
        setSelectedGroup(group);
    };

    const handleOutsideClick = (event) => {
        if (event.target.className === 'modal') {
            setShowModal(false);
        }
    };

    return (
        <div className="notes-page">
            <GroupSidebar
                groups={groups}
                onSelectGroup={handleSelectGroup}
            />
            <div className="notes-section">
                <Header selectedGroup={selectedGroup} />
                <NoteInput selectedGroup={selectedGroup} onAddNote={handleAddNote} />

                <button onClick={() => setShowModal(true)} className="create-group-btn">Create Group</button>

                {showModal && (
                    <div className="modal" onClick={handleOutsideClick}>
                        <div className="modal-content">
                            <h3>Create New Group</h3>
                            <input
                                type="text"
                                value={newGroupName}
                                onChange={(e) => setNewGroupName(e.target.value)}
                                placeholder="Group Name"
                            />
                            <button onClick={handleCreateGroup}>Create</button>
                            <button onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
