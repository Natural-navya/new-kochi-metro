import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Sample fleet data - 25 trainsets
const sampleFleetData = [
  { id: 'TS001', status: 'service-ready', mileage: 125000, lastService: '2024-01-15', route: 'Aluva-Pettah', capacity: 975, manufacturer: 'Alstom' },
  { id: 'TS002', status: 'maintenance', mileage: 98000, lastService: '2024-01-10', route: 'Aluva-Pettah', capacity: 975, manufacturer: 'Alstom' },
  { id: 'TS003', status: 'service-ready', mileage: 156000, lastService: '2024-01-12', route: 'Aluva-Pettah', capacity: 975, manufacturer: 'Alstom' },
  { id: 'TS004', status: 'standby', mileage: 87000, lastService: '2024-01-08', route: 'Aluva-Pettah', capacity: 975, manufacturer: 'Alstom' },
  { id: 'TS005', status: 'service-ready', mileage: 134000, lastService: '2024-01-14', route: 'Aluva-Pettah', capacity: 975, manufacturer: 'Alstom' },
  { id: 'TS006', status: 'maintenance', mileage: 112000, lastService: '2024-01-11', route: 'Aluva-Pettah', capacity: 975, manufacturer: 'Alstom' },
  { id: 'TS007', status: 'service-ready', mileage: 145000, lastService: '2024-01-13', route: 'Aluva-Pettah', capacity: 975, manufacturer: 'Alstom' },
  { id: 'TS008', status: 'standby', mileage: 92000, lastService: '2024-01-09', route: 'Aluva-Pettah', capacity: 975, manufacturer: 'Alstom' },
  { id: 'TS009', status: 'service-ready', mileage: 167000, lastService: '2024-01-16', route: 'Aluva-Pettah', capacity: 975, manufacturer: 'Alstom' },
  { id: 'TS010', status: 'service-ready', mileage: 138000, lastService: '2024-01-12', route: 'Aluva-Pettah', capacity: 975, manufacturer: 'Alstom' },
  { id: 'TS011', status: 'service-ready', mileage: 142000, lastService: '2024-01-17', route: 'Aluva-Pettah', capacity: 975, manufacturer: 'Alstom' },
  { id: 'TS012', status: 'maintenance', mileage: 108000, lastService: '2024-01-06', route: 'Aluva-Pettah', capacity: 975, manufacturer: 'Alstom' },
  { id: 'TS013', status: 'service-ready', mileage: 151000, lastService: '2024-01-18', route: 'Aluva-Pettah', capacity: 975, manufacturer: 'Alstom' },
  { id: 'TS014', status: 'standby', mileage: 95000, lastService: '2024-01-07', route: 'Aluva-Pettah', capacity: 975, manufacturer: 'Alstom' },
  { id: 'TS015', status: 'service-ready', mileage: 129000, lastService: '2024-01-19', route: 'Aluva-Pettah', capacity: 975, manufacturer: 'Alstom' },
  { id: 'TS016', status: 'maintenance', mileage: 115000, lastService: '2024-01-05', route: 'Aluva-Pettah', capacity: 975, manufacturer: 'Alstom' },
  { id: 'TS017', status: 'service-ready', mileage: 148000, lastService: '2024-01-20', route: 'Aluva-Pettah', capacity: 975, manufacturer: 'Alstom' },
  { id: 'TS018', status: 'standby', mileage: 89000, lastService: '2024-01-04', route: 'Aluva-Pettah', capacity: 975, manufacturer: 'Alstom' },
  { id: 'TS019', status: 'service-ready', mileage: 163000, lastService: '2024-01-21', route: 'Aluva-Pettah', capacity: 975, manufacturer: 'Alstom' },
  { id: 'TS020', status: 'service-ready', mileage: 135000, lastService: '2024-01-22', route: 'Aluva-Pettah', capacity: 975, manufacturer: 'Alstom' },
  { id: 'TS021', status: 'maintenance', mileage: 118000, lastService: '2024-01-03', route: 'Aluva-Pettah', capacity: 975, manufacturer: 'Alstom' },
  { id: 'TS022', status: 'service-ready', mileage: 154000, lastService: '2024-01-23', route: 'Aluva-Pettah', capacity: 975, manufacturer: 'Alstom' },
  { id: 'TS023', status: 'standby', mileage: 91000, lastService: '2024-01-02', route: 'Aluva-Pettah', capacity: 975, manufacturer: 'Alstom' },
  { id: 'TS024', status: 'service-ready', mileage: 141000, lastService: '2024-01-24', route: 'Aluva-Pettah', capacity: 975, manufacturer: 'Alstom' },
  { id: 'TS025', status: 'maintenance', mileage: 122000, lastService: '2024-01-01', route: 'Aluva-Pettah', capacity: 975, manufacturer: 'Alstom' }
];

// Initial state
const initialState = {
  fleetData: sampleFleetData,
  filters: {
    fleet: 'all'
  },
  loading: false,
  theme: localStorage.getItem('theme') || 'light'
};

// Action types
const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  UPDATE_FLEET_DATA: 'UPDATE_FLEET_DATA',
  SET_FILTER: 'SET_FILTER',
  SET_THEME: 'SET_THEME',
  REFRESH_DATA: 'REFRESH_DATA'
};

// Reducer
const fleetReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case ActionTypes.UPDATE_FLEET_DATA:
      return { ...state, fleetData: action.payload };
    
    case ActionTypes.SET_FILTER:
      return { 
        ...state, 
        filters: { ...state.filters, [action.filterType]: action.payload }
      };
    
    case ActionTypes.SET_THEME:
      localStorage.setItem('theme', action.payload);
      return { ...state, theme: action.payload };
    
    case ActionTypes.REFRESH_DATA:
      return { ...state, fleetData: [...sampleFleetData] };
    
    default:
      return state;
  }
};

// Create context
const FleetContext = createContext();

// Provider component
export const FleetProvider = ({ children }) => {
  const [state, dispatch] = useReducer(fleetReducer, initialState);

  // Actions
  const actions = {
    setLoading: (loading) => dispatch({ type: ActionTypes.SET_LOADING, payload: loading }),
    
    updateFleetData: (data) => dispatch({ type: ActionTypes.UPDATE_FLEET_DATA, payload: data }),
    
    setFilter: (filterType, value) => dispatch({ 
      type: ActionTypes.SET_FILTER, 
      filterType, 
      payload: value 
    }),
    
    setTheme: (theme) => dispatch({ type: ActionTypes.SET_THEME, payload: theme }),
    
    refreshData: () => dispatch({ type: ActionTypes.REFRESH_DATA })
  };

  // Computed values
  const computed = {
    readyCount: state.fleetData.filter(train => train.status === 'service-ready').length,
    maintenanceCount: state.fleetData.filter(train => train.status === 'maintenance').length,
    standbyCount: state.fleetData.filter(train => train.status === 'standby').length,
    totalCount: state.fleetData.length,
    
    filteredFleetData: state.fleetData.filter(train => {
      if (state.filters.fleet === 'all') return true;
      return train.status === state.filters.fleet;
    }),
    
    serviceReadyTrains: state.fleetData.filter(train => train.status === 'service-ready'),
    standbyTrains: state.fleetData.filter(train => train.status === 'standby'),
    maintenanceTrains: state.fleetData.filter(train => train.status === 'maintenance')
  };

  const value = {
    ...state,
    ...actions,
    ...computed
  };

  return (
    <FleetContext.Provider value={value}>
      {children}
    </FleetContext.Provider>
  );
};

// Custom hook to use the context
export const useFleet = () => {
  const context = useContext(FleetContext);
  if (!context) {
    throw new Error('useFleet must be used within a FleetProvider');
  }
  return context;
};
