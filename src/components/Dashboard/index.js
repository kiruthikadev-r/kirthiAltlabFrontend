import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './index.css';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';

function Dashboard() {
  const { user } = useAuth();
  const [ticketCount, setTicketCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const ticketResponse = await axios.get('https://kirthialtlabbackend-1.onrender.com/api/tickets/agent/tickets', {
          headers: {
            uniqueId: user.uniqueId,
          },
        });
        const customerResponse = await axios.get('https://kirthialtlabbackend-1.onrender.com/api/auth/all-user', {
          headers: {
            uniqueId: user.uniqueId,
          },
        });

        setTicketCount(ticketResponse.data.tickets.length);
        setCustomerCount(customerResponse.data.users.length);
      } catch (err) {
        setError('Error fetching data');
        console.error(err);
      }
    };

    if (user && user.uniqueId) {
      fetchCounts();
    }
  }, [user]);

  return (
    <>
    <Navbar />
    <Sidebar />
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="dashboard-stats">
        <div className="stat">
          <h3>Total Tickets</h3>
          <p>{ticketCount}</p>
        </div>
        <div className="stat">
          <h3>Total Customers</h3>
          <p>{customerCount}</p>
        </div>
      </div>
    </div>
    </>
  );
}

export default Dashboard;
