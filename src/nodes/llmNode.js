// llmNode.js

import { Handle, Position } from 'reactflow';
import { useDarkMode } from '../DarkModeContext';

export const LLMNode = ({ id, data, isConnectable }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className="llm-node"
      style={{
        width: 220,
        height: 110,
        border: '1px solid var(--border)',
        borderRadius: '12px',
        background: 'var(--surface)',
        boxShadow: 'var(--shadow-sm)',
        transition: 'transform var(--duration) var(--easing), box-shadow var(--duration) var(--easing)',
        position: 'relative'
      }}
    >
      {/* Input Handles */}
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-system`}
        style={{
          background: 'var(--primary)',
          width: '12px',
          height: '12px',
          border: '2px solid var(--surface)',
          boxShadow: 'var(--shadow-sm)',
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
          background: 'var(--primary)',
          width: '12px',
          height: '12px',
          border: '2px solid var(--surface)',
          boxShadow: 'var(--shadow-sm)',
          left: -6,
          top: '75px'
        }}
        isConnectable={isConnectable}
      />

      {/* Node Header */}
      <div 
        className="llm-node__header ds-node__header" 
        style={{ 
          padding: '8px 12px',
          borderBottom: '1px solid var(--border)',
          background: 'var(--surface-2)',
          borderTopLeftRadius: '11px',
          borderTopRightRadius: '11px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '35px',
          boxSizing: 'border-box'
        }}
      >
        <span className="ds-node__title" style={{ color: 'var(--text)' }}>
          LLM Node
        </span>
      </div>
      
      {/* Content Area */}
      <div 
        className="llm-node__content ds-node__content"
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
          color: 'var(--text-muted)',
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
          background: 'var(--success)',
          width: '12px',
          height: '12px',
          border: '2px solid var(--surface)',
          boxShadow: 'var(--shadow-sm)',
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
        color: 'var(--text-muted)',
        background: 'var(--surface-2)',
        padding: '1px 4px',
        borderRadius: '2px',
        border: '1px solid var(--border)'
      }}>
        system
      </div>
      
      <div style={{
        position: 'absolute',
        left: '8px',
        top: '68px',
        fontSize: '10px',
        color: 'var(--text-muted)',
        background: 'var(--surface-2)',
        padding: '1px 4px',
        borderRadius: '2px',
        border: '1px solid var(--border)'
      }}>
        prompt
      </div>
    </div>
  );
}
