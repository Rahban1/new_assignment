// inputNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { useDarkMode } from '../DarkModeContext';

export const InputNode = ({ id, data, isConnectable }) => {
  const { isDarkMode } = useDarkMode();
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <div
      className="input-node"
      style={{
        width: 220,
        height: 160,
        border: `1px solid ${isDarkMode ? '#4a5568' : '#cbd5e0'}`,
        borderRadius: '8px',
        background: isDarkMode ? '#2d3748' : 'white',
        boxShadow: isDarkMode ? '0 1px 3px rgba(0,0,0,0.4)' : '0 1px 3px rgba(0,0,0,0.12)',
        transition: 'all 0.2s ease-out',
        position: 'relative'
      }}
    >
      {/* Node Header */}
      <div 
        className="input-node__header" 
        style={{ 
          padding: '8px 12px',
          borderBottom: '1px solid #e2e8f0',
          background: isDarkMode ? '#374151' : '#f7fafc',
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
          color: isDarkMode ? '#f7fafc' : '#2d3748',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Input Node
        </span>
      </div>
      
      {/* Content Area */}
      <div 
        className="input-node__content"
        style={{ 
          padding: '12px',
          height: 'calc(100% - 35px)',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >
        <div>
          <label style={{ 
            display: 'block', 
            fontSize: '11px', 
            color: '#4a5568', 
            marginBottom: '4px',
            fontWeight: '500'
          }}>
            Name:
          </label>
          <input 
            type="text" 
            value={currName} 
            onChange={handleNameChange}
            style={{
              width: '100%',
              padding: '6px 8px',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              fontSize: '12px',
              outline: 'none',
              transition: 'all 0.2s',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3182ce';
              e.target.style.boxShadow = '0 0 0 3px rgba(49, 130, 206, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e2e8f0';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
        <div>
          <label style={{ 
            display: 'block', 
            fontSize: '11px', 
            color: '#4a5568', 
            marginBottom: '4px',
            fontWeight: '500'
          }}>
            Type:
          </label>
          <select 
            value={inputType} 
            onChange={handleTypeChange}
            style={{
              width: '100%',
              padding: '6px 8px',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              fontSize: '12px',
              outline: 'none',
              transition: 'all 0.2s',
              background: 'white',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3182ce';
              e.target.style.boxShadow = '0 0 0 3px rgba(49, 130, 206, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e2e8f0';
              e.target.style.boxShadow = 'none';
            }}
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </div>
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-value`}
        style={{
          background: '#48bb78',
          width: '12px',
          height: '12px',
          border: '2px solid white',
          boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
          right: -6
        }}
        isConnectable={isConnectable}
      />
    </div>
  );
}
