
import { Position } from 'reactflow';
import { BaseNode } from './node_skeleton';

export const MergeNode = ({ id, data }) => {
  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: 'input1',
      style: { top: '30%' },
    },
    {
      type: 'target',
      position: Position.Left,
      id: 'input2',
      style: { top: '70%' },
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'output',
    },
  ];

  return (
    <BaseNode id={id} data={data} handles={handles} title="Merge">
      <span className='bg-red-500'>Merge Inputs</span>
    </BaseNode>
  );
};
