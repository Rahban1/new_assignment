// draggableNode.js

import { useDarkMode } from './contexts/DarkModeContext';

export const DraggableNode = ({ type, label }) => {
    const { isDarkMode } = useDarkMode();
    
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ 
          cursor: 'grab', 
          minWidth: '80px', 
          height: '60px',
          display: 'flex', 
          alignItems: 'center', 
          borderRadius: '8px',
          backgroundColor: isDarkMode ? '#4a5568' : '#3182ce',
          border: `2px solid ${isDarkMode ? '#718096' : '#2c5aa0'}`,
          boxShadow: isDarkMode 
            ? '0 2px 4px rgba(0,0,0,0.4)' 
            : '0 2px 4px rgba(0,0,0,0.1)',
          justifyContent: 'center', 
          flexDirection: 'column',
          transition: 'all 0.2s ease'
        }} 
        draggable
        onMouseOver={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = isDarkMode 
            ? '0 4px 8px rgba(0,0,0,0.5)' 
            : '0 4px 8px rgba(0,0,0,0.15)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = isDarkMode 
            ? '0 2px 4px rgba(0,0,0,0.4)' 
            : '0 2px 4px rgba(0,0,0,0.1)';
        }}
      >
          <span style={{ 
            color: '#fff', 
            fontSize: '12px', 
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>{label}</span>
      </div>
    );
  };
  