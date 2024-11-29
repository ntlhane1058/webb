import React from 'react';
import './sidebar.css'; // Fixed the import statement
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/product-management">Product Management</Link></li>
          <li><Link to="/user-management">User Management</Link></li> {/* Always visible */}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
