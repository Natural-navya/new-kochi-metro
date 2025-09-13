import React, { useState, useEffect } from 'react';
import { useFleet } from '../context/FleetContext';
import './Settings.css';

const Settings = ({ showNotification }) => {
  const { theme, setTheme } = useFleet();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    autoRefresh: true,
    refreshInterval: 30,
    language: 'en',
    timezone: 'Asia/Kolkata'
  });

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('app-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('app-settings', JSON.stringify(newSettings));
    showNotification('Settings saved successfully!', 'success');
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    showNotification(`Theme changed to ${newTheme}`, 'success');
  };

  const handleExportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'kochi-metro-settings.json';
    link.click();
    URL.revokeObjectURL(url);
    showNotification('Settings exported successfully!', 'success');
  };

  const handleResetSettings = () => {
    const defaultSettings = {
      emailNotifications: true,
      smsNotifications: false,
      autoRefresh: true,
      refreshInterval: 30,
      language: 'en',
      timezone: 'Asia/Kolkata'
    };
    setSettings(defaultSettings);
    localStorage.setItem('app-settings', JSON.stringify(defaultSettings));
    showNotification('Settings reset to defaults!', 'success');
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Settings</h1>
        <div className="header-actions">
          <button className="btn btn-outline" onClick={handleExportSettings}>
            <i className="fas fa-download"></i> Export Settings
          </button>
          <button className="btn btn-secondary" onClick={handleResetSettings}>
            <i className="fas fa-undo"></i> Reset to Defaults
          </button>
        </div>
      </div>
      
      <div className="settings-grid">
        <div className="settings-card">
          <h3>Appearance</h3>
          <div className="setting-item">
            <label htmlFor="theme-select">Theme:</label>
            <select 
              id="theme-select"
              value={theme}
              onChange={(e) => handleThemeChange(e.target.value)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System Default</option>
            </select>
          </div>
          
          <div className="setting-item">
            <label htmlFor="language-select">Language:</label>
            <select 
              id="language-select"
              value={settings.language}
              onChange={(e) => handleSettingChange('language', e.target.value)}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="ml">Malayalam</option>
            </select>
          </div>
        </div>
        
        <div className="settings-card">
          <h3>Notifications</h3>
          <div className="setting-item">
            <label>
              <input 
                type="checkbox" 
                checked={settings.emailNotifications}
                onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
              />
              Email Notifications
            </label>
          </div>
          
          <div className="setting-item">
            <label>
              <input 
                type="checkbox" 
                checked={settings.smsNotifications}
                onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
              />
              SMS Notifications
            </label>
          </div>
        </div>
        
        <div className="settings-card">
          <h3>Data & Refresh</h3>
          <div className="setting-item">
            <label>
              <input 
                type="checkbox" 
                checked={settings.autoRefresh}
                onChange={(e) => handleSettingChange('autoRefresh', e.target.checked)}
              />
              Auto Refresh Data
            </label>
          </div>
          
          <div className="setting-item">
            <label htmlFor="refresh-interval">Refresh Interval (minutes):</label>
            <select 
              id="refresh-interval"
              value={settings.refreshInterval}
              onChange={(e) => handleSettingChange('refreshInterval', parseInt(e.target.value))}
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={120}>2 hours</option>
            </select>
          </div>
        </div>
        
        <div className="settings-card">
          <h3>System</h3>
          <div className="setting-item">
            <label htmlFor="timezone-select">Timezone:</label>
            <select 
              id="timezone-select"
              value={settings.timezone}
              onChange={(e) => handleSettingChange('timezone', e.target.value)}
            >
              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
              <option value="UTC">UTC</option>
              <option value="America/New_York">America/New_York (EST)</option>
              <option value="Europe/London">Europe/London (GMT)</option>
            </select>
          </div>
          
          <div className="setting-item">
            <div className="system-info">
              <h4>System Information</h4>
              <p><strong>Version:</strong> 1.0.0</p>
              <p><strong>Build:</strong> 2024.01.15</p>
              <p><strong>Environment:</strong> Production</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
