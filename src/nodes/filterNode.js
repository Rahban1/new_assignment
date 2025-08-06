
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './node_skeleton';

export const FilterNode = ({ id, data, isConnectable }) => {
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
          color: '#4a5568', 
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
    </BaseNode>
  );
};
