import React from 'react';
import { useDarkMode } from './DarkModeContext';

export const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      style={{
        position: 'fixed',
        top: '16px',
        right: '16px',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        border: isDarkMode ? '2px solid #4a5568' : '2px solid #e2e8f0',
        background: isDarkMode ? '#2d3748' : 'white',
        color: isDarkMode ? '#f7fafc' : '#2d3748',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        transition: 'all 0.3s ease',
        boxShadow: isDarkMode 
          ? '0 2px 8px rgba(0,0,0,0.3)' 
          : '0 2px 8px rgba(0,0,0,0.15)',
        zIndex: 1000
      }}
      onMouseOver={(e) => {
        e.target.style.transform = 'scale(1.1)';
        e.target.style.boxShadow = isDarkMode 
          ? '0 4px 12px rgba(0,0,0,0.4)' 
          : '0 4px 12px rgba(0,0,0,0.2)';
      }}
      onMouseOut={(e) => {
        e.target.style.transform = 'scale(1)';
        e.target.style.boxShadow = isDarkMode 
          ? '0 2px 8px rgba(0,0,0,0.3)' 
          : '0 2px 8px rgba(0,0,0,0.15)';
      }}
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
};