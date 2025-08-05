
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './node_skeleton';

export const FilterNode = ({ id, data }) => {
  const [query, setQuery] = useState(data?.query || '');

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: 'input',
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'output',
    },
  ];

  return (
    <BaseNode id={id} data={data} handles={handles} title="Filter">
      <label>
        Filter Query:
        <input 
          type="text" 
          value={query} 
          onChange={handleQueryChange} 
        />
      </label>
    </BaseNode>
  );
};
