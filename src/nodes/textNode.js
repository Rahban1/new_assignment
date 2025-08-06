// TextNode.js
import { useState, useRef, useCallback, useLayoutEffect } from 'react';
import { Handle, Position } from 'reactflow';

// Configuration constants - easy to maintain and modify
const NODE_CONFIG = {
  minWidth: 200,
  maxWidth: 400,
  minHeight: 80,
  maxHeight: 500,
  paddingX: 60,  // Horizontal padding for the node
  paddingY: 40,  // Vertical padding for label and handle
  defaultText: '{{input}}'
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || NODE_CONFIG.defaultText);
  const [dimensions, setDimensions] = useState({
    width: NODE_CONFIG.minWidth,
    height: NODE_CONFIG.minHeight
  });
  
  // Refs for DOM elements
  const textareaRef = useRef(null);
  const mirrorRef = useRef(null);
  const rafRef = useRef(null);

  /**
   * Creates a hidden mirror element that exactly matches the textarea's styling.
   * This allows us to measure text dimensions without affecting the visible textarea.
   */
  const createMirror = useCallback(() => {
    if (!textareaRef.current || mirrorRef.current) return;
    
    const textarea = textareaRef.current;
    const computedStyle = window.getComputedStyle(textarea);
    
    // Create mirror element
    const mirror = document.createElement('div');
    mirror.id = 'textarea-mirror';
    
    // Copy all relevant styles to ensure accurate measurement
    const stylesToCopy = [
      'fontFamily', 'fontSize', 'fontWeight', 'fontStyle',
      'letterSpacing', 'textTransform', 'wordSpacing', 'textIndent',
      'wordWrap', 'whiteSpace', 'lineHeight', 'padding', 'border'
    ];
    
    stylesToCopy.forEach(style => {
      mirror.style[style] = computedStyle[style];
    });
    
    // Position off-screen and make invisible
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

  /**
   * Calculates the required dimensions based on text content.
   * Uses requestAnimationFrame for smooth updates synchronized with browser repaints.
   */
  const calculateDimensions = useCallback((text) => {
    if (!mirrorRef.current) return;
    
    // Cancel any pending animation frame
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    // Schedule update for next animation frame
    rafRef.current = requestAnimationFrame(() => {
      const mirror = mirrorRef.current;
      
      // Update mirror content (using nbsp to preserve trailing spaces)
      mirror.textContent = text || ' ';
      
      // Get the natural dimensions of the text
      const mirrorHeight = mirror.scrollHeight;
      const mirrorWidth = mirror.scrollWidth;
      
      // Calculate final dimensions with constraints
      const newWidth = Math.max(
        NODE_CONFIG.minWidth,
        Math.min(NODE_CONFIG.maxWidth, mirrorWidth + NODE_CONFIG.paddingX)
      );
      
      const newHeight = Math.max(
        NODE_CONFIG.minHeight,
        Math.min(NODE_CONFIG.maxHeight, mirrorHeight + NODE_CONFIG.paddingY)
      );
      
      // Only update state if dimensions actually changed (prevents unnecessary re-renders)
      setDimensions(prev => {
        if (prev.width === newWidth && prev.height === newHeight) {
          return prev;
        }
        return { width: newWidth, height: newHeight };
      });
    });
  }, []);

  /**
   * Handles text changes with debouncing for performance.
   * For production, you might want to add actual debouncing for very long texts.
   */
  const handleTextChange = useCallback((e) => {
    const newText = e.target.value;
    setCurrText(newText);
    calculateDimensions(newText);
  }, [calculateDimensions]);

  /**
   * Initialize mirror and calculate initial dimensions.
   * useLayoutEffect ensures this happens before the browser paints.
   */
  useLayoutEffect(() => {
    createMirror();
    calculateDimensions(currText);
    
    // Cleanup function
    return () => {
      if (mirrorRef.current) {
        document.body.removeChild(mirrorRef.current);
        mirrorRef.current = null;
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []); // Only run once on mount

  /**
   * Recalculate when text changes programmatically (e.g., from props)
   */
  useLayoutEffect(() => {
    if (data?.text !== undefined && data.text !== currText) {
      setCurrText(data.text);
      calculateDimensions(data.text);
    }
  }, [data?.text]);

  return (
    <div 
      className="text-node"
      style={{
        width: dimensions.width,
        height: dimensions.height,
        border: '1px solid black',
        padding: '8px',
        boxSizing: 'border-box',
        transition: 'width 0.2s ease-out, height 0.2s ease-out', // Smooth visual transition
        position: 'relative'
      }}
    >
      <div className="text-node__label" style={{ 
        marginBottom: '4px',
        fontWeight: '500',
        fontSize: '12px',
        color: '#666'
      }}>
        <span>Text</span>
      </div>
      
      <div className="text-node__input-container" style={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <textarea
          ref={textareaRef}
          className="text-node__textarea"
          value={currText}
          onChange={handleTextChange}
          style={{
            width: '100%',
            height: `${dimensions.height - NODE_CONFIG.paddingY}px`,
            resize: 'none',
            overflow: 'auto', // Changed from hidden to auto for long content
            border: '1px solid #ccc',
            borderRadius: '3px',
            padding: '4px',
            boxSizing: 'border-box',
            fontFamily: 'inherit',
            fontSize: '14px',
            lineHeight: '1.4',
            outline: 'none',
            transition: 'border-color 0.2s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#007bff'}
          onBlur={(e) => e.target.style.borderColor = '#ccc'}
        />
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          background: '#555',
          width: '8px',
          height: '8px'
        }}
      />
    </div>
  );
};