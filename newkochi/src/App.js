import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Planning from './components/Planning';
import Trainsets from './components/Trainsets';
import Upload from './components/Upload';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import Notification from './components/Notification';
import { FleetProvider } from './context/FleetContext';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showPage = (pageId) => {
    setCurrentPage(pageId);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const showNotification = (message, type = 'info') => {
    const id = Date.now();
    const notification = { id, message, type };
    
    setNotifications(prev => [...prev, notification]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard showNotification={showNotification} />;
      case 'planning':
        return <Planning showNotification={showNotification} />;
      case 'trainsets':
        return <Trainsets showNotification={showNotification} />;
      case 'upload':
        return <Upload showNotification={showNotification} />;
      case 'analytics':
        return <Analytics showNotification={showNotification} />;
      case 'settings':
        return <Settings showNotification={showNotification} />;
      default:
        return <Dashboard showNotification={showNotification} />;
    }
  };

  return (
    <FleetProvider>
      <div className="app-container">
        <Sidebar 
          currentPage={currentPage} 
          onPageChange={showPage}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
        
        <main className="main-content">
          {renderPage()}
        </main>

        {/* Notifications */}
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            id={notification.id}
            message={notification.message}
            type={notification.type}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>
    </FleetProvider>
  );
}

export default App;
