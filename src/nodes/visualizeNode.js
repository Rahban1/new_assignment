
import { Position } from 'reactflow';
import { BaseNode } from './node_skeleton';

export const VisualizeNode = ({ id, data, isConnectable }) => {
  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: 'input',
      style: { left: '-6px' },
    },
  ];

  return (
    <BaseNode id={id} data={data} handles={handles} title="Visualize" isConnectable={isConnectable}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        fontSize: '11px',
        color: 'var(--text-muted)',
        textAlign: 'center'
      }}>
        Creates visual representations
      </div>
    </BaseNode>
  );
};
