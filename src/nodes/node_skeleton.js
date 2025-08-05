// Node.js

import { Handle } from 'reactflow';

export const BaseNode = ({ id, data, handles, title, children }) => {
  return (
    <div style={{width: 200, height: 80, border: '1px solid black'}}>
      {handles.map((handle, index) => (
        <Handle
          key={index}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          style={handle.style}
        />
      ))}
      <div>
        <span>{title}</span>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};