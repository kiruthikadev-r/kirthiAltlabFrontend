import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';

function TicketDetails() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [note, setNote] = useState('');

  useEffect(() => {
    axios.get(`/api/tickets/${id}`)
      .then(response => setTicket(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const handleAddNote = () => {
    //need to add api call here to make notes
  };

  if (!ticket) return <div className="loading">Loading...</div>;

  return (
    <>
    <Navbar />
    <Sidebar/>
    <div className="ticket-details-container">
      <h2 className="ticket-details-title">Ticket Details</h2>
      <p className="ticket-detail">Title: <span className="ticket-detail-value">{ticket.title}</span></p>
      <p className="ticket-detail">Status: <span className="ticket-detail-value">{ticket.status}</span></p>
      <p className="ticket-detail">Last Updated On: <span className="ticket-detail-value">{ticket.lastUpdatedOn}</span></p>

      <h3 className="ticket-notes-title">Notes</h3>
      {ticket.notes.map((note, index) => (
        <p key={index} className="ticket-note">
          {note.text} - <span className="note-author">{note.author}</span> ({note.timestamp})
        </p>
      ))}

      <div className="add-note-container">
        <input 
          type="text" 
          value={note} 
          onChange={(e) => setNote(e.target.value)} 
          placeholder="Add a note" 
          className="add-note-input"
        />
        <button onClick={handleAddNote} className="add-note-button">Add Note</button>
      </div>
    </div>
    </>
  );
}

export default TicketDetails;
