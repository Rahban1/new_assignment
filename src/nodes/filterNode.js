
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './node_skeleton';
import { useDarkMode } from '../DarkModeContext';

export const FilterNode = ({ id, data, isConnectable }) => {

  const { isDarkMode } = useDarkMode();
  
  const [query, setQuery] = useState(data?.query || '');

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: 'input',
      style: { left: '-6px' },
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'output',
      style: { right: '-6px' },
    },
  ];

  return (
    <BaseNode id={id} data={data} handles={handles} title="Filter" isConnectable={isConnectable} height={130}>
      <div>
        <label style={{ 
          display: 'block', 
          fontSize: '11px', 
          color: 'var(--text-muted)', 
          marginBottom: '4px',
          fontWeight: '500'
        }}>
          Filter Query:
        </label>
        <input 
          type="text" 
          value={query} 
          onChange={handleQueryChange}
          placeholder="Enter filter criteria..."
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
    </BaseNode>
  );
};
