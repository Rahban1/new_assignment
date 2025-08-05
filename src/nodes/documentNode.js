
import { Position } from 'reactflow';
import { BaseNode } from './node_skeleton';

export const DocumentNode = ({ id, data }) => {
  const handles = [
    {
      type: 'source',
      position: Position.Right,
      id: 'document',
    },
  ];

  return (
    <BaseNode id={id} data={data} handles={handles} title="Document">
      <label>
        Document:
        <input type="file" />
      </label>
    </BaseNode>
  );
};
