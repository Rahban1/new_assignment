
import { Position } from 'reactflow';
import { BaseNode } from './node_skeleton';

export const SplitNode = ({ id, data }) => {
  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: 'input',
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'output1',
      style: { top: '30%' },
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'output2',
      style: { top: '70%' },
    },
  ];

  return (
    <BaseNode id={id} data={data} handles={handles} title="Split">
      <span>Split Input</span>
    </BaseNode>
  );
};
