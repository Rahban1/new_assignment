import React from 'react';
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
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeClick = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    console.log('Delete edge clicked:', id);
    // We'll use a callback passed through data
    if (data?.onDelete) {
      data.onDelete(id);
    }
  };

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <g onClick={onEdgeClick} style={{ cursor: 'pointer' }}>
        <circle
          r="8"
          cx={labelX}
          cy={labelY}
          fill="#dc3545"
          stroke="white"
          strokeWidth="1"
          opacity="0.9"
          className="react-flow__edge-interaction"
        />
        <text
          x={labelX}
          y={labelY}
          textAnchor="middle"
          dominantBaseline="central"
          fill="white"
          fontSize="10"
          fontWeight="normal"
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          ×
        </text>
      </g>
    </>
  );
};

export default CustomBezierEdge;