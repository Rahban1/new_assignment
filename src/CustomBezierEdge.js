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
    if (!evt.relatedTarget || !evt.currentTarget.contains(evt.relatedTarget)) {
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

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          stroke: isHovered ? 'rgb(210,0,0)' : (style.stroke || 'color-mix(in srgb, var(--text) 38%, transparent)'),
          transition: 'stroke-width var(--duration-fast) var(--easing)'
        }}
      />
      
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
      
      {isHovered && (
        <g style={{ pointerEvents: 'all' }}>
          <circle
            r={8}
            cx={labelX}
            cy={labelY}
            fill="rgb(235,0,0)"
            stroke="white"
            strokeWidth="1"
            style={{
              filter: 'drop-shadow(0 2px 4px color-mix(in srgb, rgb(210,0,0) 40%, transparent))',
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