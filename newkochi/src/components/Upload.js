import React, { useState } from 'react';
import './Upload.css';

const Upload = ({ showNotification }) => {
  const [uploadStatus, setUploadStatus] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileId = Date.now();
    const newStatus = {
      id: fileId,
      name: file.name,
      progress: 0,
      status: 'uploading'
    };

    setUploadStatus(prev => [...prev, newStatus]);
    showNotification(`Uploading ${file.name}...`, 'info');

    // Simulate upload progress
    let progress = 0;
    const uploadInterval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(uploadInterval);
        
        setUploadStatus(prev => 
          prev.map(status => 
            status.id === fileId 
              ? { ...status, progress: 100, status: 'completed' }
              : status
          )
        );
        
        showNotification('File uploaded successfully!', 'success');
      } else {
        setUploadStatus(prev => 
          prev.map(status => 
            status.id === fileId 
              ? { ...status, progress: Math.round(progress) }
              : status
          )
        );
      }
    }, 200);
  };

  const removeStatus = (id) => {
    setUploadStatus(prev => prev.filter(status => status.id !== id));
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Data Upload</h1>
      </div>
      
      <div className="upload-section">
        <div className="upload-cards">
          <div className="upload-card">
            <div className="upload-icon">
              <i className="fas fa-file-excel"></i>
            </div>
            <h3>Upload CSV</h3>
            <p>Select a CSV file to upload trainset data</p>
            <label className="btn btn-primary">
              <input 
                type="file" 
                id="file-input" 
                accept=".csv" 
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              <i className="fas fa-upload"></i> Choose File
            </label>
          </div>
        </div>
        
        <div className="upload-status">
          <h3>Upload Status</h3>
          <div className="status-list">
            {uploadStatus.length === 0 ? (
              <p className="no-uploads">No uploads yet</p>
            ) : (
              uploadStatus.map(status => (
                <div key={status.id} className="status-item">
                  <div className="status-info">
                    <i className="fas fa-file-excel"></i>
                    <span>{status.name}</span>
                    {status.status === 'completed' && (
                      <i className="fas fa-check-circle status-completed"></i>
                    )}
                  </div>
                  <div className="status-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress" 
                        style={{ width: `${status.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{status.progress}%</span>
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => removeStatus(status.id)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
