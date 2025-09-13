import React, { useState } from 'react';
import { useFleet } from '../context/FleetContext';
import './Planning.css';

const Planning = ({ showNotification }) => {
  const { serviceReadyTrains, standbyTrains, maintenanceTrains } = useFleet();
  const [activeTab, setActiveTab] = useState('service');

  const handleGeneratePlan = () => {
    showNotification('Generating induction plan...', 'info');
    setTimeout(() => {
      showNotification('Induction plan generated successfully!', 'success');
    }, 1500);
  };

  const handleRefresh = () => {
    showNotification('Refreshing planning data...', 'info');
    setTimeout(() => {
      showNotification('Planning data refreshed!', 'success');
    }, 1000);
  };

  const handleOptimize = () => {
    showNotification('Optimizing induction selection...', 'info');
    setTimeout(() => {
      showNotification('Optimization completed!', 'success');
    }, 2000);
  };

  const handleExport = () => {
    showNotification('Exporting plan...', 'info');
    setTimeout(() => {
      showNotification('Plan exported successfully!', 'success');
    }, 1000);
  };

  const planningCriteria = [
    {
      icon: 'fas fa-certificate',
      title: 'Fitness Certificates',
      items: [
        { status: 'valid', text: 'Rolling Stock: 25 Valid' },
        { status: 'valid', text: 'Signalling: 23 Valid' },
        { status: 'warning', text: 'Telecom: 21 Valid' }
      ]
    },
    {
      icon: 'fas fa-clipboard-list',
      title: 'Job Card Status',
      items: [
        { status: 'valid', text: 'Closed: 22' },
        { status: 'warning', text: 'Open: 3' }
      ]
    },
    {
      icon: 'fas fa-ad',
      title: 'Branding Priorities',
      items: [
        { status: 'priority', text: 'High Priority: 10' },
        { status: 'normal', text: 'Normal: 15' }
      ]
    },
    {
      icon: 'fas fa-route',
      title: 'Mileage Balancing',
      items: [
        { status: 'valid', text: 'Balanced: 18' },
        { status: 'warning', text: 'Needs Rotation: 7' }
      ]
    },
    {
      icon: 'fas fa-broom',
      title: 'Cleaning Slots',
      items: [
        { status: 'valid', text: 'Available: 8' },
        { status: 'warning', text: 'Occupied: 2' }
      ]
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Stabling Geometry',
      items: [
        { status: 'valid', text: 'Optimal: 20' },
        { status: 'warning', text: 'Needs Shunting: 5' }
      ]
    }
  ];

  const tabs = [
    { id: 'service', label: `Service Ready (${serviceReadyTrains.length})`, trains: serviceReadyTrains },
    { id: 'standby', label: `Standby (${standbyTrains.length})`, trains: standbyTrains },
    { id: 'maintenance', label: `Maintenance (${maintenanceTrains.length})`, trains: maintenanceTrains }
  ];

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
        <h1>Train Induction Planning</h1>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={handleGeneratePlan}>
            <i className="fas fa-magic"></i> Generate Plan
          </button>
          <button className="btn btn-secondary" onClick={handleRefresh}>
            <i className="fas fa-sync-alt"></i> Refresh
          </button>
        </div>
      </div>

      {/* Planning Criteria */}
      <div className="planning-criteria">
        <h2>Planning Criteria</h2>
        <div className="criteria-grid">
          {planningCriteria.map((criteria, index) => (
            <div key={index} className="criteria-card">
              <div className="criteria-header">
                <i className={criteria.icon}></i>
                <h3>{criteria.title}</h3>
              </div>
              <div className="criteria-content">
                {criteria.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="status-item">
                    <span className={`status-dot ${item.status}`}></span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Induction Plan Results */}
      <div className="induction-results">
        <h2>Recommended Induction Plan</h2>
        <div className="plan-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="plan-content">
          {tabs.map(tab => (
            <div
              key={tab.id}
              className={`tab-content ${activeTab === tab.id ? 'active' : ''}`}
            >
              <div className="train-list">
                {tab.trains.map(train => (
                  <div key={train.id} className="train-item">
                    <div className="train-info">
                      <h4>{train.id}</h4>
                      <p>Mileage: {train.mileage.toLocaleString()} km</p>
                      <p>Route: {train.route}</p>
                      <p>Capacity: {train.capacity} passengers</p>
                      <p>Manufacturer: {train.manufacturer}</p>
                      <p>Last Service: {formatDate(train.lastService)}</p>
                    </div>
                    <div className="train-actions">
                      <button className="btn btn-outline btn-sm">
                        <i className="fas fa-eye"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Planning;
