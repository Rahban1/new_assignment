// outputNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';

export const OutputNode = ({ id, data, isConnectable }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <div
      className="output-node"
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
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-value`}
        style={{
          background: 'var(--primary)',
          width: '12px',
          height: '12px',
          border: '2px solid var(--surface)',
          boxShadow: 'var(--shadow-sm)',
          left: -6
        }}
        isConnectable={isConnectable}
      />

      {/* Node Header */}
      <div 
        className="output-node__header ds-node__header" 
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
        <span className="ds-node__title" style={{ color: 'var(--text)' }}>
          Output Node
        </span>
      </div>
      
      {/* Content Area */}
      <div 
        className="output-node__content"
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
            value={outputType} 
            onChange={handleTypeChange}
            style={{
              width: '100%',
              padding: '6px 8px',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              fontSize: '12px',
              outline: 'none',
              transition: 'border-color var(--duration) var(--easing), box-shadow var(--duration) var(--easing), background var(--duration) var(--easing), color var(--duration) var(--easing)',
              background: 'var(--surface)',
              color: 'var(--text)',
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
            <option value="File">Image</option>
          </select>
        </div>
      </div>
    </div>
  );
}
