import React, { useState, useEffect } from 'react';
import GroupSidebar from '../components/GroupSidebar';
import NoteInput from '../components/NoteInput';
import Header from '../components/Header';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './NotesPage.css';
import backgroundImage from '../assets/backg.png';
import lock from '../assets/Vector.png';

export default function NotesPage() {
    const [groups, setGroups] = useLocalStorage('groups', []);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');
    const [selectedColor, setSelectedColor] = useState('#000000');

    useEffect(() => {
        if (groups.length > 0 && !selectedGroup) {
            setSelectedGroup(groups[0]);  // Optionally, remove this line if you don't want to auto-select the first group
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
                content: 'Another productive way to use this tool to begin a daily writing routine. One way is to generate a random paragraph with the intention to try to rewrite it while still keeping the original meaning. The purpose here is to just get the writing started so that when the writer goes onto their days writing projects, words are already flowing from their fingers.',
                created: new Date().toISOString(),
                updated: null
            };

            const newGroup = {
                name: newGroupName,
                notes: [defaultNote],
                color: selectedColor
            };

            const updatedGroups = [...groups, newGroup];
            setGroups(updatedGroups);
            setSelectedGroup(newGroup);
            setNewGroupName('');
            setSelectedColor(selectedColor)
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
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A8', '#A833FF', '#33FFD5', '#FFD700', '#FF69B4'];

    return (
        <div className="notes-page">
            <GroupSidebar
                groups={groups}
                onSelectGroup={handleSelectGroup}
            />
            <div className="notes-section">
                {selectedGroup ? (
                    <>
                        <Header selectedGroup={selectedGroup} />
                        <NoteInput selectedGroup={selectedGroup} onAddNote={handleAddNote} />

                    </>
                ) : (
                    <div className="default-image-container">
                        <img
                            src={backgroundImage}
                            alt="Default placeholder"
                            className="default-image"
                        />
                        <h1>Pocket Notes</h1>
                        <p>Send and receive messages without keeping your phone online.
                            Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
                        <div className='footer'>
                            <img
                                src={lock}
                                className='lock-image'
                            />
                            <p>
                                end-to-end encrypted
                            </p>
                        </div>

                    </div>
                )}

                <FontAwesomeIcon
                    icon={faPlus}
                    className="create-group-icon"
                    onClick={() => setShowModal(true)}
                />

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
                            <div className="color-picker-container">
                                {colors.map((color) => (
                                    <div
                                        key={color}
                                        className={`color-picker ${color === selectedColor ? 'selected-color' : ''}`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => setSelectedColor(color)}
                                    ></div>
                                ))}
                            </div>
                            <button onClick={handleCreateGroup}>Create</button>
                            <button onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
