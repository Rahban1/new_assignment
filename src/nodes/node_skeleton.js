// Node.js

import { Handle } from 'reactflow';

export const BaseNode = ({ id, data, handles, title, children, isConnectable, width = 220, height = 110 }) => {
  return (
    <div
      className={`base-node ${title.toLowerCase()}-node`}
      style={{
        width,
        height,
        border: '1px solid #cbd5e0',
        borderRadius: '8px',
        background: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
        transition: 'all 0.2s ease-out',
        position: 'relative'
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
            border: '2px solid white',
            boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
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
          borderBottom: '1px solid #e2e8f0',
          background: '#f7fafc',
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '35px',
          boxSizing: 'border-box'
        }}
      >
        <span style={{
          fontWeight: '600',
          fontSize: '12px',
          color: '#2d3748',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {title} Node
        </span>
      </div>
      
      {/* Content Area */}
      <div 
        className={`${title.toLowerCase()}-node__content`}
        style={{ 
          padding: '12px',
          height: 'calc(100% - 35px)',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >
        {children}
      </div>
    </div>
  );
};