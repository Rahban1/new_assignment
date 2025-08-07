// Node.js

import { Handle } from 'reactflow';
import { useDarkMode } from '../DarkModeContext';
import { useStore } from '../store';

export const BaseNode = ({ id, data, handles, title, children, isConnectable, width = 220, height = 110 }) => {
  const { isDarkMode } = useDarkMode();
  const deleteNode = useStore((state) => state.deleteNode);
  const toggleNodeMinimize = useStore((state) => state.toggleNodeMinimize);
  
  const isMinimized = data?.isMinimized || false;
  
  const handleDelete = (e) => {
    e.stopPropagation();
    deleteNode(id);
  };
  
  const handleMinimize = (e) => {
    e.stopPropagation();
    toggleNodeMinimize(id);
  };

  return (
    <div
      className={`base-node ${title.toLowerCase()}-node`}
      style={{
        width,
        height: isMinimized ? 40 : height,
        border: `1px solid ${isDarkMode ? '#4a5568' : '#cbd5e0'}`,
        borderRadius: '8px',
        background: isDarkMode ? '#2d3748' : 'white',
        boxShadow: isDarkMode 
          ? '0 1px 3px rgba(0,0,0,0.4)' 
          : '0 1px 3px rgba(0,0,0,0.12)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        // overflow: 'hidden'
      }}
    >
      {handles.map((handle, index) => (
        <Handle
          key={index}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          style={{
            background: handle.type === 'target' ? '#3182ce' : '#48bb78',
            width: '12px',
            height: '12px',
            border: `2px solid ${isDarkMode ? '#2d3748' : 'white'}`,
            boxShadow: isDarkMode 
              ? '0 1px 4px rgba(0,0,0,0.5)' 
              : '0 1px 4px rgba(0,0,0,0.3)',
            ...handle.style
          }}
          isConnectable={isConnectable}
        />
      ))}
      
      {/* Node Header */}
      <div 
        className={`${title.toLowerCase()}-node__header`}
        style={{ 
          padding: '8px 12px',
          borderBottom: isMinimized ? 'none' : `1px solid ${isDarkMode ? '#4a5568' : '#e2e8f0'}`,
          background: isDarkMode ? '#374151' : '#f7fafc',
          borderTopLeftRadius: '7px',
          borderTopRightRadius: '7px',
          borderBottomLeftRadius: isMinimized ? '7px' : '0',
          borderBottomRightRadius: isMinimized ? '7px' : '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '40px',
          boxSizing: 'border-box'
        }}
      >
        <span style={{
          fontWeight: '600',
          fontSize: '12px',
          color: isDarkMode ? '#f7fafc' : '#2d3748',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {title} Node
        </span>
        
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          {/* Minimize Button */}
          <button
            onClick={handleMinimize}
            style={{
              width: '16px',
              height: '16px',
              border: 'none',
              background: 'transparent',
              color: isDarkMode ? '#9ca3af' : '#6b7280',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              transform: 'scale(1)',
              padding: '0'
            }}
            onMouseOver={(e) => {
              e.target.style.color = isDarkMode ? '#d1d5db' : '#374151';
              e.target.style.transform = 'scale(1.1)';
              e.target.style.background = 'transparent';
            }}
            onMouseOut={(e) => {
              e.target.style.color = isDarkMode ? '#9ca3af' : '#6b7280';
              e.target.style.transform = 'scale(1)';
              e.target.style.background = 'transparent';
            }}
            title={isMinimized ? 'Expand node' : 'Minimize node'}
          >
            {isMinimized ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            )}
          </button>
          
          {/* Delete Button */}
          <button
            onClick={handleDelete}
            style={{
              width: '16px',
              height: '16px',
              border: 'none',
              background: 'transparent',
              color: '#dc3545',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              transform: 'scale(1)',
              padding: '0'
            }}
            onMouseOver={(e) => {
              e.target.style.color = '#b91c1c';
              e.target.style.transform = 'scale(1.1)';
              e.target.style.background = 'transparent';
            }}
            onMouseOut={(e) => {
              e.target.style.color = '#dc3545';
              e.target.style.transform = 'scale(1)';
              e.target.style.background = 'transparent';
            }}
            title="Delete node"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Content Area */}
      <div 
        className={`${title.toLowerCase()}-node__content`}
        style={{ 
          padding: isMinimized ? '0' : '12px',
          height: isMinimized ? '0' : 'calc(100% - 35px)',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          color: isDarkMode ? '#f7fafc' : '#2d3748',
          opacity: isMinimized ? 0 : 1,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden'
        }}
      >
        {!isMinimized && children}
      </div>
    </div>
  );
};