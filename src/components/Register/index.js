import { useState } from 'react';
import axios from 'axios';
import './index.css'; 
import LoginSidebar from '../LoginSidebar';
import { useAuth } from '../../context/AuthContext';
import {useNavigate} from 'react-router-dom';

function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setError('');
    setSuccess('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('https://kirthialtlabbackend.onrender.com/api/auth/register', { name, email, password });
      
      if (response.data) {
        const {uniqueId, role} = response.data;
      navigate('/tickets')
      login(email, uniqueId, role); 

        setSuccess('Registration successful! You can now log in.');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <>
      <LoginSidebar />
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="register-title">Register</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Name" 
          className="register-input"
          required
        />
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          className="register-input"
          required
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          className="register-input"
          required
        />
        <input 
          type="password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          placeholder="Confirm Password" 
          className="register-input"
          required
        />
        <button type="submit" className="register-button">Register</button>
      </form>
    </>
  );
}

export default Register;
