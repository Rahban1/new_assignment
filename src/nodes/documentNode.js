
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
          color: 'var(--text-muted)', 
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
            border: '1px solid var(--border)',
            borderRadius: '8px',
            fontSize: '12px',
            outline: 'none',
            transition: 'border-color var(--duration) var(--easing), box-shadow var(--duration) var(--easing)',
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
