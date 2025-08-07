
import { Position } from 'reactflow';
import { BaseNode } from './node_skeleton';

export const DocumentNode = ({ id, data, isConnectable }) => {
  const handles = [
    {
      type: 'source',
      position: Position.Right,
      id: 'document',
      style: { right: '-6px' },
    },
  ];

  return (
    <BaseNode id={id} data={data} handles={handles} title="Document" isConnectable={isConnectable} height={130}>
      <div>
        <label style={{ 
          display: 'block', 
          fontSize: '11px', 
          color: '#4a5568', 
          marginBottom: '4px',
          fontWeight: '500'
        }}>
          Document:
        </label>
        <input 
          type="file"
          style={{
            width: '100%',
            padding: '6px 8px',
            border: '1px solid #e2e8f0',
            // background: isDarkMode ? '#374151' : 'white',
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
