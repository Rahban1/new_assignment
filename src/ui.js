
import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import ReactFlow, { Controls, Background, MiniMap, getBezierPath } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { nodeTypes } from './graph/nodeTypes';
import { edgeTypes } from './graph/edgeTypes';
import { useDarkMode } from './contexts/DarkModeContext';

import 'reactflow/dist/style.css';

const gridSize = 40;
const proOptions = { hideAttribution: true };

const CustomConnectionLine = ({ fromX, fromY, toX, toY, connectionLineStyle }) => {
  const [edgePath] = getBezierPath({
    sourceX: fromX,
    sourceY: fromY,
    targetX: toX,
    targetY: toY,
  });

  return (
    <g>
      <path
        fill="none"
        stroke={connectionLineStyle?.stroke || '#b1b1b7'}
        className="animated"
        d={edgePath}
      />
    </g>
  );
};



const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [showMiniMap, setShowMiniMap] = useState(false);
    const [hideTimeout, setHideTimeout] = useState(null);
    const { isDarkMode } = useDarkMode();
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const showMiniMapTemporarily = useCallback(() => {
      setShowMiniMap(true);
      
      setHideTimeout(prevTimeout => {
        if (prevTimeout) {
          clearTimeout(prevTimeout);
        }
        
        return setTimeout(() => {
          setShowMiniMap(false);
        }, 2000);
      });
    }, []);

    useEffect(() => {
      return () => {
        if (hideTimeout) {
          clearTimeout(hideTimeout);
        }
      };
    }, [hideTimeout]);

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance, addNode, getNodeID]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onViewportChange = useCallback(() => {
        showMiniMapTemporarily();
    }, [showMiniMapTemporarily]);

    const reactFlowProps = useMemo(() => ({
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        onDrop,
        onDragOver,
        onInit: setReactFlowInstance,
        onMove: onViewportChange,
        onMoveStart: showMiniMapTemporarily,
        onMoveEnd: onViewportChange,
        nodeTypes,
        edgeTypes,
        proOptions,
        snapGrid: [gridSize, gridSize],
        connectionLineComponent: CustomConnectionLine,
    }), [nodes, edges, onNodesChange, onEdgesChange, onConnect, onDrop, onDragOver, onViewportChange, showMiniMapTemporarily]);

    return (
        <div ref={reactFlowWrapper} style={{ width: '100%', flex: 1 }}>
            <ReactFlow {...reactFlowProps}>
                <Background
                    variant="dots"
                    gap={gridSize}
                    size={2.4}
                    color={isDarkMode ? 'rgba(237, 235, 229, 0.10)' : 'rgba(31, 35, 40, 0.10)'}
                />
                <Controls />
                {showMiniMap && (
                    <MiniMap 
                        style={{
                            transition: 'opacity var(--duration) var(--easing)',
                            opacity: showMiniMap ? 1 : 0,
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                            borderRadius: '10px',
                            boxShadow: 'var(--shadow-sm)'
                        }}
                    />
                )}
            </ReactFlow>
        </div>
    )
}
