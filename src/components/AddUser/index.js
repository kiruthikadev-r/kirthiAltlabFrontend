import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; 
import './index.css';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';

function CreateUser() {
  const { user } = useAuth(); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('customer'); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const response = await axios.post('https://kirthialtlabbackend-1.onrender.com/api/auth/register', {
        name,
        email,
        role,
        password
      }, {
        headers: {
          uniqueId: user.uniqueId,
        },
      });
      console.log(response.data);
      setSuccessMessage('User created successfully!');
      setName('');
      setPassword('');
      setEmail('');
      setRole('user');
    } catch (error) {
      setError('Failed to create user. Please try again.');
      console.error(error);
    }
  };

  if (user?.role !== 'admin') {
    return <div>Access Denied</div>;
  }

  return (
    <>
    <Sidebar />
    <Navbar /> 
    <div className="create-user-container">
      <h2 className="create-user-title">Create New User</h2>
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form className="create-user-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Name" 
          className="create-user-input"
          required
        />
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          className="create-user-input"
          required
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          className="create-user-input"
          required
        />
        <select 
          value={role} 
          onChange={(e) => setRole(e.target.value)} 
          className="create-user-select"
        >
          <option value="customer">customer</option>
          <option value="agent">Agent</option>
        </select>
        <button type="submit" className="create-user-button">Create User</button>
      </form>
    </div>
    </>
  );
}

export default CreateUser;
