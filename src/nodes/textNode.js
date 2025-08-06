// TextNode.js
import { useState, useRef, useCallback, useLayoutEffect, useMemo } from 'react';
import { Handle, Position } from 'reactflow';
import { useDarkMode } from '../DarkModeContext';

// Configuration constants
const NODE_CONFIG = {
  minWidth: 200,
  maxWidth: 400,
  minHeight: 80,
  maxHeight: 500,
  paddingX: 60,
  paddingY: 50,
  defaultText: '{{input}}',
  handleSpacing: 42,      // Vertical spacing between handles
  handleOffset: 20,        // Offset from node edge
  labelIndent: 65,         // Space reserved for handle labels
  handleSize: 12,          // Size of handle circle
  labelWidth: 80           // Maximum width for labels
};

/**
 * Validates if a string is a valid JavaScript variable name.
 */
const isValidJavaScriptVariableName = (name) => {
  if (!name || name.length === 0) return false;
  
  const reservedKeywords = [
    'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger',
    'default', 'delete', 'do', 'else', 'export', 'extends', 'finally',
    'for', 'function', 'if', 'import', 'in', 'instanceof', 'new', 'return',
    'super', 'switch', 'this', 'throw', 'try', 'typeof', 'var', 'void',
    'while', 'with', 'yield', 'let', 'static', 'enum', 'await', 'implements',
    'interface', 'package', 'private', 'protected', 'public', 'null', 'true', 
    'false', 'undefined', 'NaN', 'Infinity'
  ];
  
  if (reservedKeywords.includes(name)) return false;
  
  const identifierPattern = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
  return identifierPattern.test(name);
};

/**
 * Extracts variables from text in the format {{variableName}}.
 */
const extractVariables = (text) => {
  if (!text) return [];
  
  const regex = /\{\{([^}]+)\}\}/g;
  const matches = [];
  const seen = new Set();
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    const variableName = match[1].trim();
    
    if (seen.has(variableName)) continue;
    
    if (isValidJavaScriptVariableName(variableName)) {
      seen.add(variableName);
      matches.push({
        name: variableName,
        fullMatch: match[0],
        index: match.index
      });
    }
  }
  
  return matches;
};

export const TextNode = ({ id, data, isConnectable }) => {
  const { isDarkMode } = useDarkMode();
  const [currText, setCurrText] = useState(data?.text || NODE_CONFIG.defaultText);
  const [dimensions, setDimensions] = useState({
    width: NODE_CONFIG.minWidth,
    height: NODE_CONFIG.minHeight
  });
  
  const textareaRef = useRef(null);
  const mirrorRef = useRef(null);
  const rafRef = useRef(null);

  const variables = useMemo(() => {
    return extractVariables(currText);
  }, [currText]);

  /**
   * Calculate handle vertical position.
   * Positions handles in the content area, not the header.
   */
  const getHandlePosition = useCallback((index, total) => {
    // Start below the header (approximately 35px down)
    const headerHeight = 35;
    const availableHeight = dimensions.height - headerHeight - 20; // Leave some bottom padding
    
    if (total === 1) {
      // Center single handle in the content area
      return headerHeight + (availableHeight / 2);
    }
    
    // Distribute multiple handles evenly in content area
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
      
      // Add extra width if we have variables (for the labels)
      const extraWidth = variables.length > 0 ? NODE_CONFIG.labelIndent : 0;
      
      const newWidth = Math.max(
        NODE_CONFIG.minWidth,
        Math.min(NODE_CONFIG.maxWidth, mirrorWidth + NODE_CONFIG.paddingX + extraWidth)
      );
      
      // Ensure minimum height for handles
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
  }, []);

  useLayoutEffect(() => {
    if (data?.text !== undefined && data.text !== currText) {
      setCurrText(data.text);
      calculateDimensions(data.text);
    }
  }, [data?.text]);

  // Calculate left padding for the content area when variables exist
  const contentLeftPadding = variables.length > 0 ? NODE_CONFIG.labelIndent : 8;

  return (
    <div 
      className="text-node"
      style={{
        width: dimensions.width,
        height: dimensions.height,
        border: `1px solid ${isDarkMode ? '#4a5568' : '#cbd5e0'}`,
        borderRadius: '8px',
        background: isDarkMode ? '#2d3748' : 'white',
        boxShadow: isDarkMode 
          ? '0 1px 3px rgba(0,0,0,0.4)' 
          : '0 1px 3px rgba(0,0,0,0.12)',
        transition: 'all 0.2s ease-out',
        position: 'relative',
        overflow: 'visible' // Allow labels to extend outside if needed
      }}
    >
      {/* Dynamic Input Handles for Variables */}
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
            {/* The actual handle */}
            <Handle
              type="target"
              position={Position.Left}
              id={`${id}-input-${variable.name}`}
              style={{
                position: 'relative',
                background: '#3182ce',
                width: `${NODE_CONFIG.handleSize}px`,
                height: `${NODE_CONFIG.handleSize}px`,
                border: `2px solid ${isDarkMode ? '#2d3748' : 'white'}`,
                boxShadow: isDarkMode 
                  ? '0 1px 4px rgba(0,0,0,0.5)' 
                  : '0 1px 4px rgba(0,0,0,0.3)',
                left: 0,
                transform: 'translateX(-50%)'
              }}
              isConnectable={isConnectable}
            />
            
            {/* Variable label positioned inside the node */}
            <div
              style={{
                position: 'absolute',
                left: '8px',
                fontSize: '11px',
                color: isDarkMode ? '#f7fafc' : '#4a5568',
                background: isDarkMode ? '#374151' : '#f7fafc',
                padding: '2px 6px',
                borderRadius: '3px',
                whiteSpace: 'nowrap',
                userSelect: 'none',
                border: `1px solid ${isDarkMode ? '#4a5568' : '#e2e8f0'}`,
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

      {/* Node Header */}
      <div 
        className="text-node__header" 
        style={{ 
          padding: '8px 12px',
          borderBottom: `1px solid ${isDarkMode ? '#4a5568' : '#e2e8f0'}`,
          background: isDarkMode ? '#374151' : '#f7fafc',
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
          color: isDarkMode ? '#f7fafc' : '#2d3748',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Text Node
        </span>
        {variables.length > 0 && (
          <span style={{
            fontSize: '10px',
            color: isDarkMode ? '#cbd5e0' : '#718096',
            background: isDarkMode ? '#2d3748' : 'white',
            padding: '2px 6px',
            borderRadius: '10px',
            border: `1px solid ${isDarkMode ? '#4a5568' : '#e2e8f0'}`
          }}>
            {variables.length} var{variables.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>
      
      {/* Content Area with dynamic padding */}
      <div 
        className="text-node__content"
        style={{ 
          padding: '12px',
          paddingLeft: `${contentLeftPadding}px`, // Extra padding when variables exist
          height: `calc(100% - 35px)`, // Subtract header height
          boxSizing: 'border-box',
          position: 'relative'
        }}
      >
        <textarea
          ref={textareaRef}
          className="text-node__textarea"
          value={currText}
          onChange={handleTextChange}
          placeholder="Enter text... Use {{variableName}} for inputs"
          style={{
            width: '100%',
            height: '100%',
            resize: 'none',
            overflow: 'auto',
            border: `1px solid ${isDarkMode ? '#4a5568' : '#e2e8f0'}`,
            borderRadius: '4px',
            padding: '8px',
            boxSizing: 'border-box',
            fontFamily: 'Monaco, Consolas, monospace',
            fontSize: '13px',
            lineHeight: '1.6',
            outline: 'none',
            transition: 'all 0.2s',
            background: isDarkMode ? '#374151' : '#ffffff',
            color: isDarkMode ? '#f7fafc' : '#2d3748'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#3182ce';
            e.target.style.boxShadow = '0 0 0 3px rgba(49, 130, 206, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = isDarkMode ? '#4a5568' : '#e2e8f0';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>
      
      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          background: '#48bb78',
          width: `${NODE_CONFIG.handleSize}px`,
          height: `${NODE_CONFIG.handleSize}px`,
          border: `2px solid ${isDarkMode ? '#2d3748' : 'white'}`,
          boxShadow: isDarkMode 
            ? '0 1px 4px rgba(0,0,0,0.5)' 
            : '0 1px 4px rgba(0,0,0,0.3)',
          right: -NODE_CONFIG.handleSize/2
        }}
        isConnectable={isConnectable}
      />
    </div>
  );
};