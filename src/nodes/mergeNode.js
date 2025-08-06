
import { Position } from 'reactflow';
import { BaseNode } from './node_skeleton';

export const MergeNode = ({ id, data, isConnectable }) => {
  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: 'input1',
      style: { top: '50px', left: '-6px' },
    },
    {
      type: 'target',
      position: Position.Left,
      id: 'input2',
      style: { top: '80px', left: '-6px' },
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'output',
      style: { right: '-6px' },
    },
  ];

  return (
    <BaseNode id={id} data={data} handles={handles} title="Merge" isConnectable={isConnectable}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        fontSize: '11px',
        color: '#4a5568',
        textAlign: 'center'
      }}>
        Combines multiple inputs into one
      </div>
    </BaseNode>
  );
};
