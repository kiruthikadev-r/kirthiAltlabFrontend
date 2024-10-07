import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './index.css';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';

function CreateTicket() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://kirthialtlabbackend.onrender.com/api/tickets/tickets', {
        title,
        content,
      }, {
        headers: {
          uniqueId: user.uniqueId,
          'Content-Type': 'application/json',
        },
      });

      setSuccessMessage('Ticket created successfully!');
      setTitle('');
      setContent('');
      setError('');
    } catch (err) {
      setError('Error creating ticket');
      console.error(err);
    }
  };

  return (
    <>
    <Navbar/>
    <Sidebar/>
    <div className="create-ticket-container">
      <h2>Create Ticket</h2>
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form onSubmit={handleSubmit} className="create-ticket-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">Create Ticket</button>
      </form>
    </div>
    </>
  );
}

export default CreateTicket;

