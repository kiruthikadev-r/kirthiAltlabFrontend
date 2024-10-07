import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'; 
import Sidebar from '../Sidebar';

function CustomersList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get('/api/customers')
      .then(response => setCustomers(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <>
    <Sidebar />
    <div className="customers-list-container">
      <h2 className="customers-list-title">Customers</h2>
      <ul className="customers-list">
        {customers.map(customer => (
          <li key={customer.id} className="customers-list-item">
            {customer.name}
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default CustomersList;
