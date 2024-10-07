import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './index.css';

function Sidebar() {
  const { user } = useAuth(); 

  return (
    <div className="sidebar-container">
      <ul className="sidebar-menu">
        {user?.role === 'admin' ? (
          <>
            <li className="sidebar-menu-item">
              <Link to="/dashboard" className="sidebar-link">Dashboard</Link>
            </li>
            <li className="sidebar-menu-item">
              <Link to="/" className="sidebar-link">Tickets</Link>
            </li>
            <li className="sidebar-menu-item">
              <Link to="/add-user" className="sidebar-link">Add User</Link>
            </li>
          </>
        ) : (
          <>
            <li className="sidebar-menu-item">
              <Link to="/" className="sidebar-link">Tickets</Link>
            </li>
            <li className="sidebar-menu-item">
              <Link to="/add-tickets" className="sidebar-link">Add Tickets</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
