import React from 'react';
import './Notification.css';

const Notification = ({ id, message, type, onClose }) => {
  const getNotificationIcon = (type) => {
    const icons = {
      'success': 'check-circle',
      'error': 'exclamation-circle',
      'warning': 'exclamation-triangle',
      'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
  };

  return (
    <div className={`notification notification-${type}`}>
      <div className="notification-content">
        <i className={`fas fa-${getNotificationIcon(type)}`}></i>
        <span>{message}</span>
      </div>
      <button className="notification-close" onClick={onClose}>
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};

export default Notification;
