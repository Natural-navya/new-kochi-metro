import React from 'react';
import { useFleet } from '../context/FleetContext';
import MetricCard from './MetricCard';
import OptimizationPanel from './OptimizationPanel';
import FleetOverview from './FleetOverview';
import './Dashboard.css';

const Dashboard = ({ showNotification }) => {
  const { 
    readyCount, 
    maintenanceCount, 
    standbyCount, 
    totalCount,
    setLoading,
    refreshData 
  } = useFleet();

  const handleRefresh = async () => {
    setLoading(true);
    showNotification('Refreshing data...', 'info');
    
    // Simulate API call
    setTimeout(() => {
      refreshData();
      setLoading(false);
      showNotification('Data refreshed successfully!', 'success');
    }, 1500);
  };

  const handleOptimization = () => {
    showNotification('Running optimization...', 'info');
    
    setTimeout(() => {
      showNotification('Optimization completed successfully!', 'success');
    }, 2000);
  };

  return (
    <div className="page active">
      <div className="page-header">
        <h1>Fleet Management Dashboard</h1>
        <div className="header-actions">
          <button className="btn btn-outline" onClick={handleRefresh}>
            <i className="fas fa-sync-alt"></i> Refresh Data
          </button>
          <button className="btn btn-primary" onClick={handleOptimization}>
            <i className="fas fa-bolt"></i> Run Optimization
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <MetricCard
          icon="fas fa-check-circle"
          iconClass="service-ready"
          value={`${readyCount}/${totalCount}`}
          label="Service Ready"
          percentage={(readyCount / totalCount) * 100}
        />
        
        <MetricCard
          icon="fas fa-tools"
          iconClass="maintenance"
          value={`${maintenanceCount}/${totalCount}`}
          label="Under Maintenance"
          percentage={(maintenanceCount / totalCount) * 100}
          progressClass="maintenance"
        />
        
        <MetricCard
          icon="fas fa-pause-circle"
          iconClass="standby"
          value={`${standbyCount}/${totalCount}`}
          label="Standby"
          percentage={(standbyCount / totalCount) * 100}
          progressClass="standby"
        />
        
        <MetricCard
          icon="fas fa-bullseye"
          iconClass="kpi"
          value="99.7%"
          label="Punctuality KPI"
          percentage={99.7}
          progressClass="kpi"
        />
      </div>

      {/* Optimization Panel */}
      <OptimizationPanel />

      {/* Fleet Overview */}
      <FleetOverview />
    </div>
  );
};

export default Dashboard;
