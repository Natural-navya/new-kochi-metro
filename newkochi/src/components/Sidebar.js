import React from 'react';
import './Sidebar.css';

const Sidebar = ({ currentPage, onPageChange, isMobileMenuOpen, onMobileMenuToggle }) => {
  const navItems = [
    { id: 'dashboard', icon: 'fas fa-th-large', label: 'Dashboard' },
    { id: 'planning', icon: 'fas fa-calendar-check', label: 'Induction Planning' },
    { id: 'trainsets', icon: 'fas fa-train', label: 'Trainsets' },
    { id: 'upload', icon: 'fas fa-upload', label: 'Data Upload' },
    { id: 'analytics', icon: 'fas fa-chart-line', label: 'Analytics' },
    { id: 'settings', icon: 'fas fa-cog', label: 'Settings' }
  ];

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button 
        className="mobile-menu-toggle" 
        onClick={onMobileMenuToggle}
        aria-label="Toggle mobile menu"
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <i className="fas fa-subway"></i>
            <div className="logo-text">
              <h1>Kochi Metro</h1>
              <p>Fleet Management & TIPS</p>
            </div>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => onPageChange(item.id)}
            >
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
