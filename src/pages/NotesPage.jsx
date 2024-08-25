import React, { useState, useEffect } from 'react';
import GroupSidebar from '../components/GroupSidebar';
import NoteInput from '../components/NoteInput';
import Header from '../components/Header';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function NotesPage() {
    const [groups, setGroups] = useLocalStorage('groups', []);
    const [notes, setNotes] = useLocalStorage('notes', {});
    const [selectedGroup, setSelectedGroup] = useState('');

    useEffect(() => {
        if (groups.length > 0 && !selectedGroup) {
            setSelectedGroup(groups[0]);
        }
    }, [groups]);

    const handleAddNote = (content) => {
        const timestamp = new Date().toISOString();
        const newNote = {
            content,
            created: timestamp,
            updated: null
        };

        setNotes((prevNotes) => ({
            ...prevNotes,
            [selectedGroup]: [...(prevNotes[selectedGroup] || []), newNote]
        }));
    };

    const handleCreateGroup = (groupName) => {
        if (!groups.includes(groupName)) {
            setGroups([...groups, groupName]);
            setSelectedGroup(groupName);
        }
    };

    const handleSelectGroup = (groupName) => {
        setSelectedGroup(groupName);
    };

    return (
        <div className="notes-page">
            <GroupSidebar
                groups={groups}
                onCreateGroup={handleCreateGroup}
                onSelectGroup={handleSelectGroup}
            />
            <div className="notes-section">
                <Header selectedGroup={selectedGroup} />
                <NoteInput onAddNote={handleAddNote} />
            </div>
        </div>
    );
}
