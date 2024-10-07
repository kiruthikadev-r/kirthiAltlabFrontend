import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'; 
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import { useAuth } from '../../context/AuthContext'; 
import {DNA} from 'react-loader-spinner';

function TicketsList() {
  const [tickets, setTickets] = useState([]);
  const { user } = useAuth(); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state to handle async calls

  // Fetch all tickets for the agent
  const fetchTickets = async () => {
    if (user && user.uniqueId) {
      setLoading(true); // Show loading while fetching
      try {
        const response = await axios.get('https://kirthialtlabbackend.onrender.com/api/tickets/agent/tickets', {
          headers: {
            uniqueId: user.uniqueId,
          },
        });
        setTickets(response.data.tickets);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setLoading(false); // Stop loading after fetching
      }
    }
  };

  useEffect(() => {
    fetchTickets(); // Initial load of tickets
  }, [user]);

  const openModal = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTicket(null);
    setIsModalOpen(false);
  };

  const updateTicketStatus = async (ticketId, newStatus) => {
    try {
      await axios.put(`https://kirthialtlabbackend.onrender.com/api/tickets/tickets/${ticketId}/status`, 
        { status: newStatus }, 
        {
          headers: {
            uniqueId: user.uniqueId,
            'Content-Type': 'application/json',
          },
        }
      );

      setTickets(prevTickets => 
        prevTickets.map(ticket => 
          ticket.ticketId === ticketId ? { ...ticket, status: newStatus } : ticket
        )
      );
    } catch (error) {
      console.error('Error updating ticket status:', error);
    }
  };

  function Modal({ isOpen, onClose, ticket }) {
    const [noteContent, setNoteContent] = useState('');

    const handleAddNote = async () => {
      if (noteContent.trim()) {
        try {
          const response = await axios.post(`https://kirthialtlabbackend.onrender.com/api/tickets/tickets/${ticket.ticketId}/notes`, 
            { content: noteContent }, 
            {
              headers: {
                uniqueId: user.uniqueId,
                'Content-Type': 'application/json',
              },
            }
          );
    
          // Assuming the response contains the updated ticket with the new note
          const updatedTicket = response.data.ticket;
          
          setNoteContent(''); // Clear the note input
    
          // Update selected ticket with new note
          setSelectedTicket(updatedTicket);
    
          // Update the tickets list as well
          setTickets(prevTickets => 
            prevTickets.map(t => t.ticketId === updatedTicket.ticketId ? updatedTicket : t)
          );
        } catch (error) {
          console.error('Error adding note:', error);
        }
      }
    };
    

    if (!isOpen || loading) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Notes for Ticket ID: {ticket.ticketId}</h2>
          <div className="notes-container">
            {ticket.notes && ticket.notes.length > 0 ? (
              ticket.notes.map(note => (
                <div key={note._id} className="note">
                  <p><strong>{note.authorName}:</strong> {note.content}</p>
                  <p><small>{new Date(note.timestamp).toLocaleString()}</small></p>
                </div>
              ))
            ) : (
              <p>No notes available</p>
            )}
          </div>
          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Add a new note..."
          />
          <button onClick={handleAddNote}>Add Note</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="tickets-list-container">
        <h2 className="tickets-list-title">Tickets</h2>
        {loading ? (
          <div className="loader-spinner">
            <DNA
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
              colors={['#1abc9c', '#2ecc71', '#3498db']}
            />
            <p>Loading tickets...</p> 
          </div>
        ) : tickets.length > 0 ? (
          <table className="tickets-table">
            <thead>
              <tr className="table-header">
                <th>Ticket ID</th>
                <th>Title</th>
                <th>Status</th>
                <th>Customer Name</th>
                <th>Last Updated On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(ticket => (
                <tr key={ticket.id} className="table-row" onClick={() => openModal(ticket)}>
                  <td className="table-cell">
                    {ticket.ticketId}
                  </td>
                  <td className="table-cell">{ticket.title}</td>
                  <td className="table-cell">{ticket.status}</td>
                  <td className="table-cell">{ticket.customerName}</td>
                  <td className="table-cell">{ticket.lastUpdatedOn}</td>
                  <td className="table-cell">
                    {user.role === 'customer' ? (
                      <span>{ticket.status}</span>
                    ) : (
                      <select 
                        value={ticket.status}
                        onClick={(e) => e.stopPropagation()} 
                        onChange={(e) => updateTicketStatus(ticket.ticketId, e.target.value)}
                      >
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Closed">Closed</option>
                      </select>
                    )}
                  </td>


                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No tickets available.</p>
        )}

        {isModalOpen && selectedTicket && (
          <Modal 
            isOpen={isModalOpen}
            ticket={selectedTicket} 
            onClose={closeModal}
          />
        )}
      </div>
    </>
  );
}

export default TicketsList;
