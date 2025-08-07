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
        border: '1px solid var(--border)',
        borderRadius: '12px',
        background: 'var(--surface)',
        boxShadow: 'var(--shadow-sm)',
        transition: 'transform var(--duration) var(--easing), box-shadow var(--duration) var(--easing)',
        position: 'relative'
      }}
    >
      {/* Node Header */}
      <div 
        className="input-node__header" 
        style={{ 
          padding: '8px 12px',
          borderBottom: '1px solid var(--border)',
          background: 'var(--surface-2)',
          borderTopLeftRadius: '11px',
          borderTopRightRadius: '11px',
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
          color: 'var(--text)',
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
            color: 'var(--text-muted)', 
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
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              color: 'var(--text)',
              borderRadius: '8px',
              fontSize: '12px',
              outline: 'none',
              transition: 'border-color var(--duration) var(--easing), box-shadow var(--duration) var(--easing), background var(--duration) var(--easing), color var(--duration) var(--easing)',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--primary)';
              e.target.style.boxShadow = '0 0 0 3px color-mix(in srgb, var(--primary) 20%, transparent)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--border)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
        <div>
          <label style={{ 
            display: 'block', 
            fontSize: '11px', 
            color: 'var(--text-muted)', 
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
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              color: 'var(--text)',
              borderRadius: '8px',
              fontSize: '12px',
              outline: 'none',
              transition: 'border-color var(--duration) var(--easing), box-shadow var(--duration) var(--easing), background var(--duration) var(--easing), color var(--duration) var(--easing)',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--primary)';
              e.target.style.boxShadow = '0 0 0 3px color-mix(in srgb, var(--primary) 20%, transparent)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--border)';
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
          background: 'var(--success)',
          width: '12px',
          height: '12px',
          border: '2px solid var(--surface)',
          boxShadow: 'var(--shadow-sm)',
          right: -6
        }}
        isConnectable={isConnectable}
      />
    </div>
  );
}
