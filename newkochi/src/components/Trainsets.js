import React from 'react';
import { useFleet } from '../context/FleetContext';
import './Trainsets.css';

const Trainsets = ({ showNotification }) => {
  const { fleetData } = useFleet();

  const handleAddTrainset = () => {
    showNotification('Add trainset functionality coming soon!', 'info');
  };

  const handleViewDetails = (trainId) => {
    showNotification(`Viewing details for ${trainId}`, 'info');
  };

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
    <div className="page">
      <div className="page-header">
        <h1>Trainset Management</h1>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={handleAddTrainset}>
            <i className="fas fa-plus"></i> Add Trainset
          </button>
        </div>
      </div>
      
      <div className="trainset-table-container">
        <table className="trainset-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Mileage</th>
              <th>Last Service</th>
              <th>Route</th>
              <th>Capacity</th>
              <th>Manufacturer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fleetData.map(train => (
              <tr key={train.id}>
                <td><strong>{train.id}</strong></td>
                <td>
                  <span className={`status-badge ${train.status}`}>
                    <i className={getStatusIcon(train.status)}></i>
                    {getStatusText(train.status)}
                  </span>
                </td>
                <td>{train.mileage.toLocaleString()} km</td>
                <td>{formatDate(train.lastService)}</td>
                <td>{train.route}</td>
                <td>{train.capacity} passengers</td>
                <td>{train.manufacturer}</td>
                <td>
                  <button 
                    className="btn btn-outline btn-sm" 
                    onClick={() => handleViewDetails(train.id)}
                  >
                    <i className="fas fa-eye"></i> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Trainsets;
