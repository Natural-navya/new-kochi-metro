import React from 'react';
import { useFleet } from '../context/FleetContext';
import FleetCard from './FleetCard';
import './FleetOverview.css';

const FleetOverview = () => {
  const { filteredFleetData, setFilter } = useFleet();

  const handleFilterChange = (filter) => {
    setFilter('fleet', filter);
  };

  const filters = [
    { id: 'all', icon: 'fas fa-list', label: 'All' },
    { id: 'service-ready', icon: 'fas fa-check-circle', label: 'Ready' },
    { id: 'maintenance', icon: 'fas fa-tools', label: 'Maintenance' },
    { id: 'standby', icon: 'fas fa-pause-circle', label: 'Standby' }
  ];

  return (
    <div className="fleet-overview">
      <div className="section-header">
        <h2>Fleet Status Overview</h2>
        <div className="filters">
          {filters.map(filter => (
            <button
              key={filter.id}
              className="filter-btn"
              onClick={() => handleFilterChange(filter.id)}
              data-filter={filter.id}
            >
              <i className={filter.icon}></i> {filter.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="fleet-grid">
        {filteredFleetData.map(train => (
          <FleetCard key={train.id} train={train} />
        ))}
      </div>
    </div>
  );
};

export default FleetOverview;
