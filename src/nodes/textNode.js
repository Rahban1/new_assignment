import { useState, useRef, useCallback, useLayoutEffect, useMemo } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

const NODE_CONFIG = {
  minWidth: 200,
  maxWidth: 400,
  minHeight: 80,
  maxHeight: 500,
  paddingX: 60,
  paddingY: 50,
  defaultText: '{{input}}',
  handleSpacing: 42,      
  handleOffset: 20,        
  labelIndent: 65,         
  handleSize: 12,          
  labelWidth: 80           
};

const extractVariables = (text) => {
  if (!text) return [];
  
  const regex = /\{\{([^}]+)\}\}/g;
  const matches = [];
  const seen = new Set();
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    const variableName = match[1].trim();
    
    if (seen.has(variableName)) continue;
    
    seen.add(variableName);
    matches.push({
      name: variableName,
      fullMatch: match[0],
      index: match.index
    });
  }
  
  return matches;
};

export const TextNode = ({ id, data, isConnectable }) => {
  const deleteNode = useStore((state) => state.deleteNode);
  const [currText, setCurrText] = useState(data?.text || NODE_CONFIG.defaultText);
  const [dimensions, setDimensions] = useState({
    width: NODE_CONFIG.minWidth,
    height: NODE_CONFIG.minHeight
  });
  
  const textareaRef = useRef(null);
  const mirrorRef = useRef(null);
  const rafRef = useRef(null);

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteNode(id);
  };

  const variables = useMemo(() => {
    return extractVariables(currText);
  }, [currText]);

  const getHandlePosition = useCallback((index, total) => {
    const headerHeight = 35;
    const availableHeight = dimensions.height - headerHeight - 20; 
    
    if (total === 1) {
      return headerHeight + (availableHeight / 2);
    }
    
    const spacing = availableHeight / (total + 1);
    return headerHeight + spacing * (index + 1);
  }, [dimensions.height]);

  const createMirror = useCallback(() => {
    if (!textareaRef.current || mirrorRef.current) return;
    
    const textarea = textareaRef.current;
    const computedStyle = window.getComputedStyle(textarea);
    
    const mirror = document.createElement('div');
    mirror.id = 'textarea-mirror';
    
    const stylesToCopy = [
      'fontFamily', 'fontSize', 'fontWeight', 'fontStyle',
      'letterSpacing', 'textTransform', 'wordSpacing', 'textIndent',
      'wordWrap', 'whiteSpace', 'lineHeight', 'padding', 'border'
    ];
    
    stylesToCopy.forEach(style => {
      mirror.style[style] = computedStyle[style];
    });
    
    Object.assign(mirror.style, {
      position: 'absolute',
      top: '-9999px',
      left: '-9999px',
      visibility: 'hidden',
      width: 'auto',
      height: 'auto',
      minWidth: `${NODE_CONFIG.minWidth - NODE_CONFIG.paddingX}px`,
      maxWidth: `${NODE_CONFIG.maxWidth - NODE_CONFIG.paddingX}px`,
      wordBreak: 'break-word',
      whiteSpace: 'pre-wrap'
    });
    
    document.body.appendChild(mirror);
    mirrorRef.current = mirror;
  }, []);

  const calculateDimensions = useCallback((text) => {
    if (!mirrorRef.current) return;
    
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    rafRef.current = requestAnimationFrame(() => {
      const mirror = mirrorRef.current;
      mirror.textContent = text || ' ';
      
      const mirrorHeight = mirror.scrollHeight;
      const mirrorWidth = mirror.scrollWidth;
      
      const extraWidth = variables.length > 0 ? NODE_CONFIG.labelIndent : 0;
      
      const newWidth = Math.max(
        NODE_CONFIG.minWidth,
        Math.min(NODE_CONFIG.maxWidth, mirrorWidth + NODE_CONFIG.paddingX + extraWidth)
      );
      
      const minHeightForHandles = variables.length > 0 
        ? Math.max(NODE_CONFIG.minHeight, 35 + (variables.length * NODE_CONFIG.handleSpacing) + 20)
        : NODE_CONFIG.minHeight;
      
      const newHeight = Math.max(
        minHeightForHandles,
        Math.min(NODE_CONFIG.maxHeight, mirrorHeight + NODE_CONFIG.paddingY)
      );
      
      setDimensions(prev => {
        if (prev.width === newWidth && prev.height === newHeight) {
          return prev;
        }
        return { width: newWidth, height: newHeight };
      });
    });
  }, [variables]);

  const handleTextChange = useCallback((e) => {
    const newText = e.target.value;
    setCurrText(newText);
    calculateDimensions(newText);
  }, [calculateDimensions]);

  useLayoutEffect(() => {
    createMirror();
    calculateDimensions(currText);
    
    return () => {
      if (mirrorRef.current) {
        document.body.removeChild(mirrorRef.current);
        mirrorRef.current = null;
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [calculateDimensions, createMirror, currText]);

  useLayoutEffect(() => {
    if (data?.text !== undefined && data.text !== currText) {
      setCurrText(data.text);
      calculateDimensions(data.text);
    }
  }, [data?.text, calculateDimensions, currText]);

  const contentLeftPadding = variables.length > 0 ? NODE_CONFIG.labelIndent : 8;

  return (
    <div 
      className="text-node"
      style={{
        width: dimensions.width,
        height: dimensions.height,
        border: '1px solid var(--border)',
        borderRadius: '12px',
        background: 'var(--surface)',
        boxShadow: 'var(--shadow-sm)',
        transition: 'transform var(--duration) var(--easing), box-shadow var(--duration) var(--easing)',
        position: 'relative',
        overflow: 'visible' 
      }}
    >
      {variables.map((variable, index) => {
        const yPosition = getHandlePosition(index, variables.length);
        
        return (
          <div
            key={`${id}-handle-group-${variable.name}`}
            style={{
              position: 'absolute',
              left: 0,
              top: `${yPosition}px`,
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
              zIndex: 10
            }}
          >
            <Handle
              type="target"
              position={Position.Left}
              id={`${id}-input-${variable.name}`}
              style={{
                position: 'relative',
                background: 'var(--primary)',
                width: `${NODE_CONFIG.handleSize}px`,
                height: `${NODE_CONFIG.handleSize}px`,
                border: '2px solid var(--surface)',
                boxShadow: 'var(--shadow-sm)',
                left: 0,
                transform: 'translateX(-50%)'
              }}
              isConnectable={isConnectable}
            />
            
            <div
              style={{
                position: 'absolute',
                left: '8px',
                fontSize: '11px',
                color: 'var(--text)',
                background: 'var(--surface-2)',
                padding: '2px 6px',
                borderRadius: '3px',
                whiteSpace: 'nowrap',
                userSelect: 'none',
                border: '1px solid var(--border)',
                maxWidth: `${NODE_CONFIG.labelWidth}px`,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontFamily: 'Monaco, Consolas, monospace',
                fontWeight: '500'
              }}
            >
              {variable.name}
            </div>
          </div>
        );
      })}

      <div 
        className="text-node__header" 
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
          Text Node
        </span>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          {variables.length > 0 && (
            <span style={{
              fontSize: '10px',
              color: 'var(--text-muted)',
              background: 'var(--surface)',
              padding: '2px 6px',
              borderRadius: '10px',
              border: '1px solid var(--border)'
            }}>
              {variables.length} var{variables.length !== 1 ? 's' : ''}
            </span>
          )}
          <button
            onClick={handleDelete}
            style={{
              width: '16px',
              height: '16px',
              border: 'none',
              background: 'transparent',
              color: 'var(--danger)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform var(--duration) var(--easing), color var(--duration) var(--easing)',
              transform: 'scale(1)',
              padding: 0
            }}
            onMouseOver={(e) => {
              e.target.style.color = 'color-mix(in srgb, var(--danger) 86%, black)';
              e.target.style.transform = 'scale(1.08)';
            }}
            onMouseOut={(e) => {
              e.target.style.color = 'var(--danger)';
              e.target.style.transform = 'scale(1)';
            }}
            title="Delete node"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div 
        className="text-node__content"
        style={{ 
          padding: '12px',
          paddingLeft: `${contentLeftPadding}px`,
          height: `calc(100% - 35px)`,
          boxSizing: 'border-box',
          position: 'relative'
        }}
      >
        <textarea
          ref={textareaRef}
          className="text-node__textarea"
          value={currText}
          onChange={handleTextChange}
          placeholder="Enter text..."
          style={{
            width: '100%',
            height: '100%',
            resize: 'none',
            overflow: 'auto',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '8px',
            boxSizing: 'border-box',
            fontFamily: 'Monaco, Consolas, monospace',
            fontSize: '13px',
            lineHeight: '1.6',
            outline: 'none',
            transition: 'border-color var(--duration) var(--easing), box-shadow var(--duration) var(--easing), background var(--duration) var(--easing), color var(--duration) var(--easing)',
            background: 'var(--surface)',
            color: 'var(--text)'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--primary)';
            e.target.style.boxShadow = '0 0 0 3px color-mix(in srgb, var(--primary) 20%, transparent)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'var(--border)';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          background: 'var(--success)',
          width: `${NODE_CONFIG.handleSize}px`,
          height: `${NODE_CONFIG.handleSize}px`,
          border: '2px solid var(--surface)',
          boxShadow: 'var(--shadow-sm)',
          right: -NODE_CONFIG.handleSize/2
        }}
        isConnectable={isConnectable}
      />
    </div>
  );
};