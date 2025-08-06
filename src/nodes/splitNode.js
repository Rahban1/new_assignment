
import { Position } from 'reactflow';
import { BaseNode } from './node_skeleton';

export const SplitNode = ({ id, data, isConnectable }) => {
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
      id: 'output1',
      style: { top: '50px', right: '-6px' },
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'output2',
      style: { top: '80px', right: '-6px' },
    },
  ];

  return (
    <BaseNode id={id} data={data} handles={handles} title="Split" isConnectable={isConnectable}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        fontSize: '11px',
        color: '#4a5568',
        textAlign: 'center'
      }}>
        Splits input into multiple outputs
      </div>
    </BaseNode>
  );
};
