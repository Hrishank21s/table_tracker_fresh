import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation({ user, onLogout }) {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          🎱 Table Tracker Weekend Rush
        </div>
        
        <ul className="nav-links">
          <li>
            <Link 
              to="/snooker" 
              className={location.pathname === '/snooker' ? 'active' : ''}
            >
              🟢 Snooker Tables
            </Link>
          </li>
          <li>
            <Link 
              to="/pool" 
              className={location.pathname === '/pool' ? 'active' : ''}
            >
              🔵 Pool Tables
            </Link>
          </li>
          {user?.role === 'admin' && (
            <li>
              <Link 
                to="/settings" 
                className={location.pathname === '/settings' ? 'active' : ''}
              >
                ⚙️ Settings
              </Link>
            </li>
          )}
        </ul>
        
        <div className="nav-user">
          <span className="user-info">
            👤 {user?.username} ({user?.role})
          </span>
          <button className="btn-logout" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
