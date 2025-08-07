import React, { useState, useRef, useEffect } from 'react';
import { getBezierPath } from 'reactflow';

const CustomBezierEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef(null);
  
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = (evt) => {
    // Only hide if we're not moving to a child element
    if (!evt.currentTarget.contains(evt.relatedTarget)) {
      hoverTimeoutRef.current = setTimeout(() => {
        setIsHovered(false);
      }, 300);
    }
  };

  const onEdgeClick = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    if (data?.onDelete) {
      data.onDelete(id);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Main edge path - instant color change */}
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          stroke: isHovered ? 'var(--danger)' : (style.stroke || 'color-mix(in srgb, var(--text) 38%, transparent)'),
          strokeWidth: isHovered ? 2 : (style.strokeWidth || 1.25),
          transition: 'stroke-width var(--duration-fast) var(--easing)'
        }}
      />
      
      {/* Extra thick invisible hover area for reliable detection */}
      <path
        d={edgePath}
        fill="none"
        stroke="transparent"
        strokeWidth="60"
        style={{ 
          cursor: 'default',
          pointerEvents: 'stroke'
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      
      {/* Delete button - positioned absolutely to avoid interfering with hover */}
      {isHovered && (
        <g style={{ pointerEvents: 'all' }}>
          <circle
            r={12}
            cx={labelX}
            cy={labelY}
            fill="var(--danger)"
            stroke="white"
            strokeWidth="2"
            style={{
              filter: 'drop-shadow(0 2px 4px color-mix(in srgb, var(--danger) 40%, transparent))',
              cursor: 'pointer'
            }}
            onClick={onEdgeClick}
            onMouseEnter={handleMouseEnter}
          />
          <text
            x={labelX}
            y={labelY}
            textAnchor="middle"
            dominantBaseline="central"
            fill="white"
            fontSize="12"
            fontWeight="bold"
            style={{ 
              pointerEvents: 'none', 
              userSelect: 'none'
            }}
          >
            ×
          </text>
        </g>
      )}
    </>
  );
};

export default CustomBezierEdge;