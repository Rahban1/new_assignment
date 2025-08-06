// llmNode.js

import { Handle, Position } from 'reactflow';

export const LLMNode = ({ id, data, isConnectable }) => {

  return (
    <div
      className="llm-node"
      style={{
        width: 220,
        height: 110,
        border: '1px solid #cbd5e0',
        borderRadius: '8px',
        background: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
        transition: 'all 0.2s ease-out',
        position: 'relative'
      }}
    >
      {/* Input Handles */}
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-system`}
        style={{
          background: '#3182ce',
          width: '12px',
          height: '12px',
          border: '2px solid white',
          boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
          left: -6,
          top: '45px'
        }}
        isConnectable={isConnectable}
      />
      
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-prompt`}
        style={{
          background: '#3182ce',
          width: '12px',
          height: '12px',
          border: '2px solid white',
          boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
          left: -6,
          top: '75px'
        }}
        isConnectable={isConnectable}
      />

      {/* Node Header */}
      <div 
        className="llm-node__header" 
        style={{ 
          padding: '8px 12px',
          borderBottom: '1px solid #e2e8f0',
          background: '#f7fafc',
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '35px',
          boxSizing: 'border-box'
        }}
      >
        <span style={{
          fontWeight: '600',
          fontSize: '12px',
          color: '#2d3748',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          LLM Node
        </span>
      </div>
      
      {/* Content Area */}
      <div 
        className="llm-node__content"
        style={{ 
          padding: '12px',
          height: 'calc(100% - 35px)',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <span style={{
          fontSize: '11px',
          color: '#4a5568',
          textAlign: 'center'
        }}>
          Large Language Model processing
        </span>
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-response`}
        style={{
          background: '#48bb78',
          width: '12px',
          height: '12px',
          border: '2px solid white',
          boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
          right: -6
        }}
        isConnectable={isConnectable}
      />

      {/* Handle Labels */}
      <div style={{
        position: 'absolute',
        left: '8px',
        top: '38px',
        fontSize: '10px',
        color: '#718096',
        background: '#f7fafc',
        padding: '1px 4px',
        borderRadius: '2px',
        border: '1px solid #e2e8f0'
      }}>
        system
      </div>
      
      <div style={{
        position: 'absolute',
        left: '8px',
        top: '68px',
        fontSize: '10px',
        color: '#718096',
        background: '#f7fafc',
        padding: '1px 4px',
        borderRadius: '2px',
        border: '1px solid #e2e8f0'
      }}>
        prompt
      </div>
    </div>
  );
}
