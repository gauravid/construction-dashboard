import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTools } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid px-4">
        {/* Brand with icon */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <FaTools className="me-2" style={{ fontSize: '1.4rem', color: '#f39c12' }} />
          <span style={{ fontWeight: '600' }}>Construction Dashboard</span>
        </Link>

        {/* Toggler for mobile view */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {[
              { name: 'Dashboard', path: '/' },
              { name: 'Tool List', path: '/tools' },
              { name: 'Add Tool', path: '/add' }
            ].map((item) => (
              <li className="nav-item" key={item.path}>
                <Link
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  to={item.path}
                  style={{
                    fontWeight: '500',
                    color: location.pathname === item.path ? '#f39c12' : '#ccc',
                    margin: '0 10px'
                  }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
