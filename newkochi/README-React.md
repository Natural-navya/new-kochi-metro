# Kochi Metro Fleet Management System - React Application

A modern, responsive React application for managing Kochi Metro's fleet operations, train induction planning, and analytics.

## 🚀 Features

### 📊 Dashboard
- Real-time fleet status overview with interactive metrics
- Service ready, maintenance, and standby train counts
- Punctuality KPIs with visual progress bars
- Optimization recommendations panel
- Dynamic fleet grid with filtering capabilities

### 📅 Induction Planning
- Comprehensive planning criteria evaluation
- Fitness certificate tracking with status indicators
- Job card status monitoring
- Branding priority management
- Mileage balancing and cleaning slot availability
- Tabbed interface for different train categories

### 🚂 Trainset Management
- Complete trainset inventory with detailed table
- Status tracking with color-coded badges
- Mileage monitoring and service history
- Interactive action buttons for each trainset

### 📈 Analytics & Reports
- Interactive charts using Chart.js and react-chartjs-2
- Fleet utilization trends
- Maintenance analytics
- Performance metrics dashboard
- Real-time alerts and notifications

### ⚙️ Settings
- Theme selection (Light/Dark/System)
- Notification preferences
- Auto-refresh configuration
- Language and timezone settings
- Settings export/import functionality

### 📤 Data Upload
- CSV file upload with progress tracking
- Real-time upload status monitoring
- File management and removal

## 🛠 Technology Stack

- **Frontend Framework**: React 18.2.0
- **State Management**: React Context API with useReducer
- **Styling**: CSS Modules with CSS Custom Properties
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: Font Awesome 6.0
- **Fonts**: Inter (Google Fonts)
- **Build Tool**: Create React App

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Analytics.js     # Analytics dashboard with charts
│   ├── Dashboard.js     # Main dashboard component
│   ├── FleetCard.js     # Individual fleet card component
│   ├── FleetOverview.js # Fleet overview with filtering
│   ├── MetricCard.js    # Metric display card
│   ├── Notification.js  # Toast notification component
│   ├── OptimizationPanel.js # Optimization recommendations
│   ├── Planning.js      # Induction planning interface
│   ├── Settings.js      # Settings and preferences
│   ├── Sidebar.js       # Navigation sidebar
│   ├── Trainsets.js     # Trainset management table
│   └── Upload.js        # File upload interface
├── context/
│   └── FleetContext.js  # Global state management
├── App.js              # Main application component
├── App.css             # App-specific styles
├── index.js            # Application entry point
└── index.css           # Global styles and CSS variables
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16.0 or higher
- npm or yarn package manager

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm start
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#2563eb)
- **Success**: Green (#10b981)
- **Warning**: Orange (#f59e0b)
- **Danger**: Red (#ef4444)
- **Info**: Blue (#3b82f6)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700
- **Responsive sizing** with CSS custom properties

### Layout
- **Grid System**: CSS Grid and Flexbox
- **Responsive Breakpoints**:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## 🔧 Key Features

### State Management
- **Context API**: Global state management with FleetContext
- **useReducer**: Complex state logic with reducers
- **Local Storage**: Persistent settings and preferences

### Component Architecture
- **Modular Design**: Reusable components with clear separation
- **Props Interface**: Well-defined component interfaces
- **CSS Modules**: Scoped styling for each component

### Performance Optimizations
- **React.memo**: Prevent unnecessary re-renders
- **useCallback**: Optimize event handlers
- **Lazy Loading**: Code splitting for better performance

### Accessibility
- **ARIA Labels**: Proper accessibility attributes
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Compatible with assistive technologies

## 📱 Responsive Design

The application is fully responsive with:
- **Mobile-first approach**
- **Collapsible sidebar** for mobile devices
- **Touch-friendly interfaces**
- **Adaptive layouts** for all screen sizes

## 🎯 Sample Data

The application includes comprehensive sample data:
- **10 trainsets** with realistic configurations
- **Various statuses** (Service Ready, Maintenance, Standby)
- **Mileage and service data**
- **Route information** and timestamps

## 🔮 Future Enhancements

- [ ] **Real-time data integration** with WebSocket connections
- [ ] **Advanced analytics** with more chart types
- [ ] **User authentication** and role-based access
- [ ] **Data export** functionality (PDF, Excel)
- [ ] **Progressive Web App** (PWA) features
- [ ] **Multi-language support** with i18n
- [ ] **Unit and integration tests**
- [ ] **Performance monitoring** and optimization

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## 📦 Building for Production

```bash
# Create production build
npm run build

# Serve production build locally
npx serve -s build
```

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

This project is for demonstration purposes. Please ensure proper licensing for production use.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For questions or support, please refer to the documentation or create an issue in the repository.

---

**Kochi Metro Fleet Management System** - Modern React application for efficient fleet operations management.
