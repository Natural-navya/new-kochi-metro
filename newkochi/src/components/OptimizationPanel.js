import React, { useState } from 'react';
import './OptimizationPanel.css';

const OptimizationPanel = () => {
  const [optimizationCards, setOptimizationCards] = useState([
    {
      id: 1,
      icon: 'fas fa-route',
      title: 'Route Optimization',
      description: 'Optimize train routes for better efficiency'
    },
    {
      id: 2,
      icon: 'fas fa-clock',
      title: 'Schedule Adjustment',
      description: 'Adjust schedules to reduce wait times'
    }
  ]);

  const handleDetails = () => {
    // Add new optimization card
    const newCard = {
      id: Date.now(),
      icon: 'fas fa-chart-line',
      title: 'Performance Boost',
      description: 'Optimized train scheduling for 15% efficiency improvement'
    };
    
    setOptimizationCards(prev => [...prev, newCard]);
  };

  return (
    <div className="optimization-panel">
      <div className="panel-header">
        <h3>Optimization Recommendations</h3>
        <button className="btn btn-outline" onClick={handleDetails}>
          <i className="fas fa-info-circle"></i> Details
        </button>
      </div>
      
      <div className="optimization-cards">
        {optimizationCards.map(card => (
          <div key={card.id} className="optimization-card">
            <div className="card-icon">
              <i className={card.icon}></i>
            </div>
            <div className="card-content">
              <h4>{card.title}</h4>
              <p>{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptimizationPanel;
