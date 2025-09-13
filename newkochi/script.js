// Kochi Metro Fleet Management System - JavaScript

const AppState = {
    currentPage: 'dashboard',
    fleetData: [],
    isMobileMenuOpen: false,
    filters: {
        fleet: 'all'
    }
};

const sampleFleetData = [
    { id: 'TS001', status: 'service-ready', mileage: 125000, lastService: '2024-01-15', route: 'Aluva-Pettah' },
    { id: 'TS002', status: 'maintenance', mileage: 98000, lastService: '2024-01-10', route: 'Aluva-Pettah' },
    { id: 'TS003', status: 'service-ready', mileage: 156000, lastService: '2024-01-12', route: 'Aluva-Pettah' },
    { id: 'TS004', status: 'standby', mileage: 87000, lastService: '2024-01-08', route: 'Aluva-Pettah' },
    { id: 'TS005', status: 'service-ready', mileage: 134000, lastService: '2024-01-14', route: 'Aluva-Pettah' },
    { id: 'TS006', status: 'maintenance', mileage: 112000, lastService: '2024-01-11', route: 'Aluva-Pettah' },
    { id: 'TS007', status: 'service-ready', mileage: 145000, lastService: '2024-01-13', route: 'Aluva-Pettah' },
    { id: 'TS008', status: 'standby', mileage: 92000, lastService: '2024-01-09', route: 'Aluva-Pettah' },
    { id: 'TS009', status: 'service-ready', mileage: 167000, lastService: '2024-01-16', route: 'Aluva-Pettah' },
    { id: 'TS010', status: 'service-ready', mileage: 138000, lastService: '2024-01-12', route: 'Aluva-Pettah' },
    { id: 'TS011', status: 'service-ready', mileage: 125000, lastService: '2024-01-15', route: 'Aluva-Pettah' },
    { id: 'TS012', status: 'maintenance', mileage: 98000, lastService: '2024-01-10', route: 'Aluva-Pettah' },
    { id: 'TS013', status: 'service-ready', mileage: 156000, lastService: '2024-01-12', route: 'Aluva-Pettah' },
    { id: 'TS014', status: 'standby', mileage: 87000, lastService: '2024-01-08', route: 'Aluva-Pettah' },
    { id: 'TS015', status: 'service-ready', mileage: 134000, lastService: '2024-01-14', route: 'Aluva-Pettah' },
    { id: 'TS016', status: 'maintenance', mileage: 112000, lastService: '2024-01-11', route: 'Aluva-Pettah' },
    { id: 'TS017', status: 'service-ready', mileage: 145000, lastService: '2024-01-13', route: 'Aluva-Pettah' },
    { id: 'TS018', status: 'standby', mileage: 92000, lastService: '2024-01-09', route: 'Aluva-Pettah' },
    { id: 'TS019', status: 'service-ready', mileage: 167000, lastService: '2024-01-16', route: 'Aluva-Pettah' },
    { id: 'TS020', status: 'service-ready', mileage: 138000, lastService: '2024-01-12', route: 'Aluva-Pettah' },
    { id: 'TS021', status: 'maintenance', mileage: 112000, lastService: '2024-01-11', route: 'Aluva-Pettah' },
    { id: 'TS022', status: 'service-ready', mileage: 145000, lastService: '2024-01-13', route: 'Aluva-Pettah' },
    { id: 'TS023', status: 'standby', mileage: 92000, lastService: '2024-01-09', route: 'Aluva-Pettah' },
    { id: 'TS024', status: 'service-ready', mileage: 167000, lastService: '2024-01-16', route: 'Aluva-Pettah' },
    { id: 'TS025', status: 'service-ready', mileage: 138000, lastService: '2024-01-12', route: 'Aluva-Pettah' }
];

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadFleetData();
    updateDashboard();
    generateFleetGrid();
    generateTrainsetTable();
});

function initializeApp() {
    showPage('dashboard');
    
    setupMobileMenu();
    
    initializeTheme();
    
    document.body.classList.add('fade-in');
}

function setupEventListeners() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', handleNavigation);
    });
    
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }
    
    const refreshBtn = document.getElementById('refresh-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', refreshData);
    }
    
    const optimizeBtn = document.getElementById('optimize-btn');
    if (optimizeBtn) {
        optimizeBtn.addEventListener('click', runOptimization);
    }
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', handleFilterChange);
    });
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', handleTabChange);
    });
    
    const fileInput = document.getElementById('file-input');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileUpload);
    }
    
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
        themeSelect.addEventListener('change', handleThemeChange);
    }
    
    window.addEventListener('resize', handleWindowResize);
}
function sendWhatsAppMessage() {
    const messageInput = document.getElementById('whatsapp-message-input');
    const message = messageInput.value.trim();
    const statusElement = document.getElementById('message-status');
    const statusText = document.getElementById('status-text');
    const statusTimestamp = document.getElementById('status-timestamp');
    
    if (message === '') {
        showStatus('Please enter a message before sending.', 'error');
        return;
    }
    
    showStatus(`Message sent to WhatsApp: <strong>"${message}"</strong>`, 'success');
    
    messageInput.value = '';
    
    simulateBackendProcessing(message);
}

function showStatus(text, type) {
    const statusElement = document.getElementById('message-status');
    const statusText = document.getElementById('status-text');
    const statusTimestamp = document.getElementById('status-timestamp');
    
    statusElement.className = 'message-status ' + type;
    statusText.innerHTML = text;
    statusTimestamp.textContent = getCurrentTime();
    
    if (type === 'success') {
        setTimeout(() => {
            statusElement.style.opacity = '0';
            setTimeout(() => {
                statusElement.className = 'message-status';
                statusElement.style.opacity = '1';
            }, 1000);
        }, 5000);
    }
}

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString() + ' • ' + now.toLocaleDateString();
}

function simulateBackendProcessing(message) {
    console.log('Simulating backend processing for message:', message);
    
  
function syncDatabase() {
    const syncButton = document.querySelector('.upload-card .btn-outline');
    const originalText = syncButton.innerHTML;
    
    syncButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Syncing...';
    syncButton.disabled = true;
    
    setTimeout(() => {
        const statusList = document.getElementById('status-list');
        const syncItem = document.createElement('div');
        syncItem.className = 'status-item';
        syncItem.innerHTML = `
            <div class="status-icon success">
                <i class="fas fa-check"></i>
            </div>
            <div class="status-content">
                <h4>Database synchronized successfully</h4>
                <p>${getCurrentTime()}</p>
            </div>
        `;
        statusList.prepend(syncItem);
        
        syncButton.innerHTML = originalText;
        syncButton.disabled = false;
        
        showNotification('Database synchronized successfully', 'success');
    }, 2500);
}
function handleNavigation(e) {
    e.preventDefault();
    const page = e.currentTarget.getAttribute('data-page');
    showPage(page);
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
    
    if (AppState.isMobileMenuOpen) {
        toggleMobileMenu();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const sendButton = document.getElementById('whatsapp-send-button');
    const messageInput = document.getElementById('whatsapp-message-input');
    const statusElement = document.getElementById('message-status');
    const statusText = document.getElementById('status-text');
    const statusTimestamp = document.getElementById('status-timestamp');
    
    if (sendButton) {
        sendButton.addEventListener('click', sendWhatsAppMessage);
    }
    
    if (messageInput) {
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendWhatsAppMessage();
            }
        });
    }
    
    const fileInput = document.getElementById('file-input');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileUpload);
    }
    
    function showStatus(text, type) {
        statusElement.className = 'message-status ' + type;
        statusText.innerHTML = text;
        statusTimestamp.textContent = getCurrentTime();
        
        if (type === 'success') {
            setTimeout(() => {
                statusElement.style.opacity = '0';
                setTimeout(() => {
                    statusElement.className = 'message-status';
                    statusElement.style.opacity = '1';
                }, 1000);
            }, 5000);
        }
    }
    
    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString() + ' • ' + now.toLocaleDateString();
    }
    
    function simulateBackendProcessing(message) {
        console.log('Simulating backend processing for message:', message);
        
       
    }
    
    function handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            setTimeout(() => {
                const statusList = document.getElementById('status-list');
                const newStatus = document.createElement('div');
                newStatus.className = 'status-item';
                newStatus.innerHTML = `
                    <div class="status-icon success">
                        <i class="fas fa-check"></i>
                    </div>
                    <div class="status-content">
                        <h4>File "${file.name}" uploaded successfully</h4>
                        <p>${getCurrentTime()}</p>
                    </div>
                `;
                statusList.prepend(newStatus);
                
                showStatus(`File uploaded: <strong>"${file.name}"</strong>. Notified team via WhatsApp.`, 'success');
            }, 1500);
        }
    }
    
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            document.querySelector('.sidebar').classList.toggle('active');
        });
    }
});
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        AppState.currentPage = pageId;
        
        switch(pageId) {
            case 'dashboard':
                updateDashboard();
                break;
            case 'planning':
                updatePlanningPage();
                break;
            case 'trainsets':
                generateTrainsetTable();
                break;
            case 'analytics':
                initializeCharts();
                break;
        }
    }
}

function setupMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    
    if (window.innerWidth <= 1024) {
        sidebar.classList.add('mobile-hidden');
    }
}

function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    AppState.isMobileMenuOpen = !AppState.isMobileMenuOpen;
    
    if (AppState.isMobileMenuOpen) {
        sidebar.classList.add('open');
    } else {
        sidebar.classList.remove('open');
    }
}

function handleWindowResize() {
    const sidebar = document.querySelector('.sidebar');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    
    if (window.innerWidth <= 1024) {
        sidebar.classList.remove('open');
        AppState.isMobileMenuOpen = false;
    }
}

function loadFleetData() {
    AppState.fleetData = [...sampleFleetData];
}

function updateDashboard() {
    const readyCount = AppState.fleetData.filter(train => train.status === 'service-ready').length;
    const maintenanceCount = AppState.fleetData.filter(train => train.status === 'maintenance').length;
    const standbyCount = AppState.fleetData.filter(train => train.status === 'standby').length;
    const totalCount = AppState.fleetData.length;
    
    updateMetricCard('ready-count', `${readyCount}/${totalCount}`);
    updateMetricCard('maintenance-count', `${maintenanceCount}/${totalCount}`);
    updateMetricCard('standby-count', `${standbyCount}/${totalCount}`);
    
    updateProgressBar('ready-progress', (readyCount / totalCount) * 100);
    updateProgressBar('maintenance-progress', (maintenanceCount / totalCount) * 100);
    updateProgressBar('standby-progress', (standbyCount / totalCount) * 100);
}

function updateMetricCard(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = value;
    }
}

function updateProgressBar(elementId, percentage) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.width = `${percentage}%`;
    }
}

function generateFleetGrid() {
    const fleetGrid = document.getElementById('fleet-grid');
    if (!fleetGrid) return;
    
    fleetGrid.innerHTML = '';
    
    AppState.fleetData.forEach(train => {
        const fleetCard = createFleetCard(train);
        fleetGrid.appendChild(fleetCard);
    });
}

function createFleetCard(train) {
    const card = document.createElement('div');
    card.className = `fleet-card ${train.status}`;
    
    const statusIcon = getStatusIcon(train.status);
    const statusText = getStatusText(train.status);
    
    card.innerHTML = `
        <div class="fleet-card-header">
            <h4>${train.id}</h4>
            <span class="status-badge ${train.status}">
                <i class="${statusIcon}"></i>
                ${statusText}
            </span>
        </div>
        <div class="fleet-card-content">
            <p><strong>Mileage:</strong> ${train.mileage.toLocaleString()} km</p>
            <p><strong>Route:</strong> ${train.route}</p>
            <p><strong>Last Service:</strong> ${formatDate(train.lastService)}</p>
        </div>
    `;
    
    return card;
}

function getStatusIcon(status) {
    const icons = {
        'service-ready': 'fas fa-check-circle',
        'maintenance': 'fas fa-tools',
        'standby': 'fas fa-pause-circle'
    };
    return icons[status] || 'fas fa-question-circle';
}

function getStatusText(status) {
    const texts = {
        'service-ready': 'Ready',
        'maintenance': 'Maintenance',
        'standby': 'Standby'
    };
    return texts[status] || 'Unknown';
}

function generateTrainsetTable() {
    const tableBody = document.getElementById('trainset-table-body');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    AppState.fleetData.forEach(train => {
        const row = createTrainsetRow(train);
        tableBody.appendChild(row);
    });
}

function createTrainsetRow(train) {
    const row = document.createElement('tr');
    const statusIcon = getStatusIcon(train.status);
    const statusText = getStatusText(train.status);
    
    row.innerHTML = `
        <td><strong>${train.id}</strong></td>
        <td>
            <span class="status-badge ${train.status}">
                <i class="${statusIcon}"></i>
                ${statusText}
            </span>
        </td>
        <td>${train.mileage.toLocaleString()} km</td>
        <td>${formatDate(train.lastService)}</td>
        <td>
            <button class="btn btn-outline btn-sm" onclick="viewTrainsetDetails('${train.id}')">
                <i class="fas fa-eye"></i> View
            </button>
        </td>
    `;
    
    return row;
}

function handleFilterChange(e) {
    const filter = e.currentTarget.getAttribute('data-filter');
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
    
    filterFleetGrid(filter);
}

function filterFleetGrid(filter) {
    const fleetGrid = document.getElementById('fleet-grid');
    if (!fleetGrid) return;
    
    const cards = fleetGrid.querySelectorAll('.fleet-card');
    
    cards.forEach(card => {
        if (filter === 'all' || card.classList.contains(filter)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function handleTabChange(e) {
    const tab = e.currentTarget.getAttribute('data-tab');
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    const targetContent = document.getElementById(`${tab}-tab`);
    if (targetContent) {
        targetContent.classList.add('active');
    }
}

function refreshData() {
    const refreshBtn = document.getElementById('refresh-btn');
    if (refreshBtn) {
        refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
        refreshBtn.disabled = true;
    }
    
    setTimeout(() => {
        loadFleetData();
        updateDashboard();
        generateFleetGrid();
        generateTrainsetTable();
        
        if (refreshBtn) {
            refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh Data';
            refreshBtn.disabled = false;
        }
        
        showNotification('Data refreshed successfully!', 'success');
    }, 1500);
}

function runOptimization() {
    const optimizeBtn = document.getElementById('optimize-btn');
    if (optimizeBtn) {
        optimizeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Optimizing...';
        optimizeBtn.disabled = true;
    }
    
    setTimeout(() => {
        if (optimizeBtn) {
            optimizeBtn.innerHTML = '<i class="fas fa-bolt"></i> Run Optimization';
            optimizeBtn.disabled = false;
        }
        
        showNotification('Optimization completed successfully!', 'success');
        updateOptimizationCards();
    }, 2000);
}

function updateOptimizationCards() {
    const optimizationCards = document.getElementById('optimization-cards');
    if (!optimizationCards) return;
    
    const newCard = document.createElement('div');
    newCard.className = 'optimization-card';
    newCard.innerHTML = `
        <div class="card-icon">
            <i class="fas fa-chart-line"></i>
        </div>
        <div class="card-content">
            <h4>Performance Boost</h4>
            <p>Optimized train scheduling for 15% efficiency improvement</p>
        </div>
    `;
    
    optimizationCards.appendChild(newCard);
}

function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const statusList = document.getElementById('status-list');
    if (!statusList) return;
    
    const statusItem = document.createElement('div');
    statusItem.className = 'status-item';
    statusItem.innerHTML = `
        <div class="status-info">
            <i class="fas fa-file-excel"></i>
            <span>${file.name}</span>
        </div>
        <div class="status-progress">
            <div class="progress-bar">
                <div class="progress" style="width: 0%"></div>
            </div>
        </div>
    `;
    
    statusList.appendChild(statusItem);
    
    let progress = 0;
    const progressBar = statusItem.querySelector('.progress');
    
    const uploadInterval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
            progress = 100;
            clearInterval(uploadInterval);
            statusItem.classList.add('completed');
            showNotification('File uploaded successfully!', 'success');
        }
        progressBar.style.width = `${progress}%`;
    }, 200);
}

function initializeCharts() {
    const utilizationCanvas = document.getElementById('utilization-chart');
    if (utilizationCanvas) {
        createUtilizationChart(utilizationCanvas);
    }
    
    const maintenanceCanvas = document.getElementById('maintenance-chart');
    if (maintenanceCanvas) {
        createMaintenanceChart(maintenanceCanvas);
    }
}

function createUtilizationChart(canvas) {
    const ctx = canvas.getContext('2d');
    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Fleet Utilization %',
            data: [85, 92, 78, 95, 88, 75, 90],
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            borderColor: 'rgba(37, 99, 235, 1)',
            borderWidth: 2,
            fill: true
        }]
    };
    
    drawSimpleChart(ctx, data, 'line');
}

function createMaintenanceChart(canvas) {
    const ctx = canvas.getContext('2d');
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Maintenance Hours',
            data: [120, 95, 140, 110, 125, 100],
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderColor: 'rgba(239, 68, 68, 1)',
            borderWidth: 2,
            fill: true
        }]
    };
    
    drawSimpleChart(ctx, data, 'bar');
}

function drawSimpleChart(ctx, data, type) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const padding = 40;
    
    ctx.clearRect(0, 0, width, height);
    
    
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
    
    const maxValue = Math.max(...data.datasets[0].data);
    const stepX = (width - 2 * padding) / (data.labels.length - 1);
    const stepY = (height - 2 * padding) / maxValue;
    
    ctx.strokeStyle = data.datasets[0].borderColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    data.datasets[0].data.forEach((value, index) => {
        const x = padding + index * stepX;
        const y = height - padding - value * stepY;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
        
        ctx.fillStyle = data.datasets[0].borderColor;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
    });
    
    ctx.stroke();
}

function updatePlanningPage() {
    updatePlanningCriteria();
    
    generateInductionPlan();
}
function updatePlanningCriteria() {
    console.log('Updating planning criteria...');
}

function generateInductionPlan() {
    const serviceTrains = AppState.fleetData.filter(train => train.status === 'service-ready');
    const standbyTrains = AppState.fleetData.filter(train => train.status === 'standby');
    const maintenanceTrains = AppState.fleetData.filter(train => train.status === 'maintenance');
    
    updateTrainList('service-trains', serviceTrains);
    updateTrainList('standby-trains', standbyTrains);
    updateTrainList('maintenance-trains', maintenanceTrains);
}

function updateTrainList(containerId, trains) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    trains.forEach(train => {
        const trainItem = document.createElement('div');
        trainItem.className = 'train-item';
        trainItem.innerHTML = `
            <div class="train-info">
                <h4>${train.id}</h4>
                <p>Mileage: ${train.mileage.toLocaleString()} km</p>
                <p>Route: ${train.route}</p>
            </div>
            <div class="train-actions">
                <button class="btn btn-outline btn-sm" onclick="viewTrainsetDetails('${train.id}')">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        `;
        container.appendChild(trainItem);
    });
}

function viewTrainsetDetails(trainId) {
    const train = AppState.fleetData.find(t => t.id === trainId);
    if (train) {
        showNotification(`Viewing details for ${trainId}`, 'info');
    }
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
        themeSelect.value = savedTheme;
    }
}

function handleThemeChange(e) {
    const theme = e.target.value;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

window.generateInductionPlan = generateInductionPlan;
window.refreshData = refreshData;
window.optimizeInduction = runOptimization;
window.exportPlan = function() {
    showNotification('Plan exported successfully!', 'success');
};
window.viewTrainsetDetails = viewTrainsetDetails;

const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 8px;
        padding: 16px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        border-left: 4px solid #3b82f6;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 300px;
        animation: slideInRight 0.3s ease-out;
    }
    
    .notification-success {
        border-left-color: #10b981;
    }
    
    .notification-error {
        border-left-color: #ef4444;
    }
    
    .notification-warning {
        border-left-color: #f59e0b;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 1;
    }
    
    .notification-close {
        background: none;
        border: none;
        cursor: pointer;
        color: #6b7280;
        padding: 4px;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

