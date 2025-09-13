import React from 'react';
import './FleetCard.css';

const FleetCard = ({ train }) => {
  const getStatusIcon = (status) => {
    const icons = {
      'service-ready': 'fas fa-check-circle',
      'maintenance': 'fas fa-tools',
      'standby': 'fas fa-pause-circle'
    };
    return icons[status] || 'fas fa-question-circle';
  };

  const getStatusText = (status) => {
    const texts = {
      'service-ready': 'Ready',
      'maintenance': 'Maintenance',
      'standby': 'Standby'
    };
    return texts[status] || 'Unknown';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`fleet-card ${train.status}`}>
      <div className="fleet-card-header">
        <h4>{train.id}</h4>
        <span className={`status-badge ${train.status}`}>
          <i className={getStatusIcon(train.status)}></i>
          {getStatusText(train.status)}
        </span>
      </div>
      <div className="fleet-card-content">
        <p><strong>Mileage:</strong> {train.mileage.toLocaleString()} km</p>
        <p><strong>Route:</strong> {train.route}</p>
        <p><strong>Capacity:</strong> {train.capacity} passengers</p>
        <p><strong>Manufacturer:</strong> {train.manufacturer}</p>
        <p><strong>Last Service:</strong> {formatDate(train.lastService)}</p>
      </div>
    </div>
  );
};

export default FleetCard;
