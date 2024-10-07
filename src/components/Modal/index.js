
import React, { useState } from 'react';
import './modal.css';

function Modal({ isOpen, onClose, ticket, addNote }) {
  const [noteContent, setNoteContent] = useState('');

  const handleAddNote = async () => {
    if (noteContent.trim()) {
      await addNote(ticket.ticketId, noteContent);
      setNoteContent('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Notes for Ticket ID: {ticket.ticketId}</h2>
        <div className="notes-container">
          {ticket.notes.map(note => (
            <div key={note._id} className="note">
              <p><strong>{note.authorName}:</strong> {note.content}</p>
              <p><small>{new Date(note.timestamp).toLocaleString()}</small></p>
            </div>
          ))}
        </div>
        <textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="Add a new note..."
        />
        <button style={{ backgroundColor: '#1abc9c', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer' }} onClick={handleAddNote}>Add Note</button>
        <button style={{ backgroundColor: 'transparent', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer' }} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Modal;
