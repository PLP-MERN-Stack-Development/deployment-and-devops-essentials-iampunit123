import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_SUCCESS':
      return { ...state, success: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'CLEAR_FILTERS':
      return { ...state, filters: {} };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'ADD_TO_CART':
      return { 
        ...state, 
        cart: [...state.cart, action.payload],
        cartCount: state.cartCount + 1
      };
    case 'REMOVE_FROM_CART':
      return { 
        ...state, 
        cart: state.cart.filter(item => item.id !== action.payload),
        cartCount: Math.max(0, state.cartCount - 1)
      };
    case 'CLEAR_CART':
      return { ...state, cart: [], cartCount: 0 };
    case 'SET_USER_PREFERENCES':
      return { ...state, userPreferences: { ...state.userPreferences, ...action.payload } };
    default:
      return state;
  }
};

const initialState = {
  loading: false,
  error: null,
  success: null,
  filters: {},
  searchQuery: '',
  cart: [],
  cartCount: 0,
  userPreferences: {
    currency: 'USD',
    language: 'en',
    notifications: true,
    theme: 'light'
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const actions = {
    setLoading: (loading) => dispatch({ type: 'SET_LOADING', payload: loading }),
    setError: (error) => dispatch({ type: 'SET_ERROR', payload: error }),
    setSuccess: (success) => dispatch({ type: 'SET_SUCCESS', payload: success }),
    setFilters: (filters) => dispatch({ type: 'SET_FILTERS', payload: filters }),
    clearFilters: () => dispatch({ type: 'CLEAR_FILTERS' }),
    setSearchQuery: (query) => dispatch({ type: 'SET_SEARCH_QUERY', payload: query }),
    addToCart: (item) => dispatch({ type: 'ADD_TO_CART', payload: item }),
    removeFromCart: (itemId) => dispatch({ type: 'REMOVE_FROM_CART', payload: itemId }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    setUserPreferences: (preferences) => dispatch({ type: 'SET_USER_PREFERENCES', payload: preferences })
  };

  const value = {
    ...state,
    ...actions
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};