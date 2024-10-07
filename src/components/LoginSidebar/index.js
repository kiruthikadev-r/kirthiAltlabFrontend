import { Link } from 'react-router-dom';
import './index.css';

function Sidebar() {
  return (
    <div className="sidebar-container">
      <ul className="sidebar-menu">
        <li className="sidebar-menu-item">
          <Link to="/login" className="sidebar-link">Login</Link>
        </li>
        <li className="sidebar-menu-item">
          <Link to="/register" className="sidebar-link">Register</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
