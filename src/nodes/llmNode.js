
import { Position } from 'reactflow';
import { BaseNode } from './node_skeleton';

export const LLMNode = ({ id, data, isConnectable }) => {
  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: "system",
      style: { left: -6, top: '45px' }
    },
    {
      type: "target", 
      position: Position.Left,
      id: "prompt",
      style: { left: -6, top: '75px' }
    },
    {
      type: "source",
      position: Position.Right,
      id: "response", 
      style: { right: -6 }
    }
  ];

  const handleLabels = [
    {
      text: "system",
      style: { left: '8px', top: '38px' }
    },
    {
      text: "prompt", 
      style: { left: '8px', top: '68px' }
    }
  ];

  const contentStyle = {
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'center'
  };

  return (
    <BaseNode
      id={id}
      handles={handles}
      handleLabels={handleLabels}
      title="LLM"
      isConnectable={isConnectable}
      width={220}
      height={110}
      contentStyle={contentStyle}
    >
      <span style={{
        fontSize: '11px',
        color: 'var(--text-muted)',
        textAlign: 'center'
      }}>
        Large Language Model processing
      </span>
    </BaseNode>
  );
}
