import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import './index.css';
import LoginSidebar from '../LoginSidebar';
import {useNavigate} from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const [error, setError] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://kirthialtlabbackend.onrender.com/api/auth/login', { email, password });
      const { uniqueId, role } = response.data;
      navigate('/')
      login(email, uniqueId, role); 
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <>
      <LoginSidebar />
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>
        {error && <p className="error-message">{error}</p>}
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          className="login-input"
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          className="login-input"
        />
        <button type="submit" className="login-button">Login</button>
      </form>
    </>
  );
}

export default Login;

