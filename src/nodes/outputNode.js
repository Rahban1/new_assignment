
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './node_skeleton';

export const OutputNode = ({ id, data, isConnectable }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: "value",
      style: { left: -6 }
    }
  ];

  return (
    <BaseNode
      id={id}
      handles={handles}
      title="Output"
      isConnectable={isConnectable}
      width={220}
      height={160}
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
    </BaseNode>
  );
}
