import React from 'react';
import './MetricCard.css';

const MetricCard = ({ 
  icon, 
  iconClass, 
  value, 
  label, 
  percentage, 
  progressClass = '' 
}) => {
  return (
    <div className="metric-card">
      <div className={`metric-icon ${iconClass}`}>
        <i className={icon}></i>
      </div>
      <div className="metric-content">
        <h3>{value}</h3>
        <p>{label}</p>
        <div className="progress-bar">
          <div 
            className={`progress ${progressClass}`} 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
