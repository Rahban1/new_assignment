// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { DocumentNode } from './nodes/documentNode';
import { FilterNode } from './nodes/filterNode';
import { MergeNode } from './nodes/mergeNode';
import { SplitNode } from './nodes/splitNode';
import { VisualizeNode } from './nodes/visualizeNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

// Define nodeTypes outside component to prevent re-creation on every render
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  document: DocumentNode,
  filter: FilterNode,
  merge: MergeNode,
  split: SplitNode,
  visualize: VisualizeNode,
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
      
      // Clear existing timeout
      setHideTimeout(prevTimeout => {
        if (prevTimeout) {
          clearTimeout(prevTimeout);
        }
        
        // Set new timeout to hide minimap after 2 seconds
        return setTimeout(() => {
          setShowMiniMap(false);
        }, 2000);
      });
    }, []);

    // Clean up timeout on component unmount
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
      
            // check if the dropped element is valid
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
        proOptions,
        snapGrid: [gridSize, gridSize],
        connectionLineType: 'smoothstep'
    }), [nodes, edges, onNodesChange, onEdgesChange, onConnect, onDrop, onDragOver, onViewportChange, showMiniMapTemporarily]);

    return (
        <div ref={reactFlowWrapper} style={{ width: '100%', flex: 1 }}>
            <ReactFlow {...reactFlowProps}>
                <Background color="#aaa" gap={gridSize} />
                <Controls />
                {showMiniMap && (
                    <MiniMap 
                        style={{
                            transition: 'opacity 0.3s ease-in-out',
                            opacity: showMiniMap ? 1 : 0
                        }}
                    />
                )}
            </ReactFlow>
        </div>
    )
}
