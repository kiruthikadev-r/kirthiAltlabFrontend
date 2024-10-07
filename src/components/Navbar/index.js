import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './index.css';

function Navbar() {
  const { user, logout: authLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    authLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="user-info">
          {user && (
            <>
              <span className="user-name">{user.email}</span>
              <span className="user-type">{user.role}</span>
            </>
          )}
        </div>
      </div>
      <ul className="navbar-links">
        <li>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

