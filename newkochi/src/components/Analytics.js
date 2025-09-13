import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import './Analytics.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Analytics = ({ showNotification }) => {
  const chartRef = useRef();

  useEffect(() => {
    showNotification('Loading analytics data...', 'info');
  }, [showNotification]);

  // Fleet Utilization Chart Data
  const utilizationData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Fleet Utilization %',
        data: [85, 92, 78, 95, 88, 75, 90],
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }
    ]
  };

  // Maintenance Chart Data
  const maintenanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Maintenance Hours',
        data: [120, 95, 140, 110, 125, 100],
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    }
  };

  const lineChartOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      y: {
        ...chartOptions.scales.y,
        max: 100,
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      }
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Analytics & Reports</h1>
        <div className="header-actions">
          <button className="btn btn-primary">
            <i className="fas fa-download"></i> Export Report
          </button>
          <button className="btn btn-secondary">
            <i className="fas fa-refresh"></i> Refresh Data
          </button>
        </div>
      </div>
      
      <div className="analytics-grid">
        <div className="chart-card">
          <h3>Fleet Utilization</h3>
          <div className="chart-container">
            <Line data={utilizationData} options={lineChartOptions} />
          </div>
        </div>
        
        <div className="chart-card">
          <h3>Maintenance Trends</h3>
          <div className="chart-container">
            <Bar data={maintenanceData} options={chartOptions} />
          </div>
        </div>
        
        <div className="chart-card">
          <h3>Performance Metrics</h3>
          <div className="metrics-summary">
            <div className="metric-item">
              <div className="metric-value">99.7%</div>
              <div className="metric-label">Punctuality</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">87%</div>
              <div className="metric-label">Fleet Availability</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">2.3</div>
              <div className="metric-label">Avg. Maintenance Days</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">156K</div>
              <div className="metric-label">Avg. Mileage</div>
            </div>
          </div>
        </div>
        
        <div className="chart-card">
          <h3>Recent Alerts</h3>
          <div className="alerts-list">
            <div className="alert-item warning">
              <i className="fas fa-exclamation-triangle"></i>
              <div className="alert-content">
                <div className="alert-title">Maintenance Due</div>
                <div className="alert-desc">TS003 requires scheduled maintenance</div>
              </div>
            </div>
            <div className="alert-item info">
              <i className="fas fa-info-circle"></i>
              <div className="alert-content">
                <div className="alert-title">High Mileage</div>
                <div className="alert-desc">TS009 approaching service interval</div>
              </div>
            </div>
            <div className="alert-item success">
              <i className="fas fa-check-circle"></i>
              <div className="alert-content">
                <div className="alert-title">Service Complete</div>
                <div className="alert-desc">TS002 maintenance completed successfully</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
