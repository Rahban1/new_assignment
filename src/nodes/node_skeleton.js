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
      className={`base-node ds-node ${title.toLowerCase()}-node`}
      style={{
        width,
        height: isMinimized ? 40 : height,
        border: '1px solid var(--border)',
        borderRadius: '12px',
        background: 'var(--surface)',
        boxShadow: 'var(--shadow-sm)',
        transition: 'transform var(--duration) var(--easing), box-shadow var(--duration) var(--easing), background var(--duration) var(--easing), border-color var(--duration) var(--easing)',
        position: 'relative',
      }}
    >
      {handles.map((handle, index) => (
        <Handle
          key={index}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          style={{
            background: handle.type === 'target' ? 'var(--primary)' : 'var(--success)',
            width: '12px',
            height: '12px',
            border: '2px solid var(--surface)',
            boxShadow: 'var(--shadow-sm)',
            ...handle.style
          }}
          isConnectable={isConnectable}
        />
      ))}
      
      {/* Node Header */}
      <div 
        className={`${title.toLowerCase()}-node__header ds-node__header`}
        style={{ 
          padding: '8px 12px',
          borderBottom: isMinimized ? 'none' : '1px solid var(--border)',
          background: 'var(--surface-2)',
          borderTopLeftRadius: '11px',
          borderTopRightRadius: '11px',
          borderBottomLeftRadius: isMinimized ? '11px' : '0',
          borderBottomRightRadius: isMinimized ? '11px' : '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '40px',
          boxSizing: 'border-box'
        }}
      >
        <span className="ds-node__title" style={{ color: 'var(--text)' }}>
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
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform var(--duration) var(--easing), color var(--duration) var(--easing)',
              transform: 'scale(1)',
              padding: 0
            }}
            onMouseOver={(e) => {
              e.target.style.color = 'var(--text)';
              e.target.style.transform = 'scale(1.08)';
            }}
            onMouseOut={(e) => {
              e.target.style.color = 'var(--text-muted)';
              e.target.style.transform = 'scale(1)';
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
              color: 'var(--danger)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform var(--duration) var(--easing), color var(--duration) var(--easing)',
              transform: 'scale(1)',
              padding: 0
            }}
            onMouseOver={(e) => {
              e.target.style.color = 'color-mix(in srgb, var(--danger) 86%, black)';
              e.target.style.transform = 'scale(1.08)';
            }}
            onMouseOut={(e) => {
              e.target.style.color = 'var(--danger)';
              e.target.style.transform = 'scale(1)';
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