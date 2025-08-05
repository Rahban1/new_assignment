
import { Position } from 'reactflow';
import { BaseNode } from './node_skeleton';

export const VisualizeNode = ({ id, data }) => {
  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: 'input',
    },
  ];

  return (
    <BaseNode id={id} data={data} handles={handles} title="Visualize">
      <span>Visualization</span>
    </BaseNode>
  );
};
