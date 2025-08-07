// toolbar.js

import { useState } from 'react';
import { useDarkMode } from './DarkModeContext';
import {
    InputIcon,
    LLMIcon,
    OutputIcon,
    TextIcon,
    DocumentIcon,
    FilterIcon,
    MergeIcon,
    SplitIcon,
    VisualizeIcon
} from './icons';

export const PipelineToolbar = ({ isExpanded, toggleToolbar }) => {
    const { isDarkMode } = useDarkMode();
    const [hoveredIcon, setHoveredIcon] = useState(null);
    const [hoveredToggle, setHoveredToggle] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    const nodeTypes = [
        { 
            type: 'customInput', 
            label: 'Input', 
            icon: <InputIcon />,
            description: 'Drag to add an input node',
            shortcut: 'I'
        },
        { 
            type: 'llm', 
            label: 'LLM', 
            icon: <LLMIcon />,
            description: 'Drag to add a language model node',
            shortcut: 'L'
        },
        { 
            type: 'customOutput', 
            label: 'Output', 
            icon: <OutputIcon />,
            description: 'Drag to add an output node',
            shortcut: 'O'
        },
        { 
            type: 'text', 
            label: 'Text', 
            icon: <TextIcon />,
            description: 'Drag to add a text processing node',
            shortcut: 'T'
        },
        { 
            type: 'document', 
            label: 'Document', 
            icon: <DocumentIcon />,
            description: 'Drag to add a document node',
            shortcut: 'D'
        },
        { 
            type: 'filter', 
            label: 'Filter', 
            icon: <FilterIcon />,
            description: 'Drag to add a filter node',
            shortcut: 'F'
        },
        { 
            type: 'merge', 
            label: 'Merge', 
            icon: <MergeIcon />,
            description: 'Drag to add a merge node',
            shortcut: 'M'
        },
        { 
            type: 'split', 
            label: 'Split', 
            icon: <SplitIcon />,
            description: 'Drag to add a split node',
            shortcut: 'S'
        },
        { 
            type: 'visualize', 
            label: 'Visualize', 
            icon: <VisualizeIcon />,
            description: 'Drag to add a visualization node',
            shortcut: 'V'
        }
    ];

    const getNodeItemStyle = (node) => ({
        padding: '12px',
        margin: '0 4px',
        borderRadius: '16px',
        background: isDarkMode 
            ? 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' 
            : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        color: 'white',
        cursor: 'grab',
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: isDarkMode 
            ? '0 4px 15px rgba(79, 70, 229, 0.3), 0 2px 6px rgba(0, 0, 0, 0.3)' 
            : '0 4px 15px rgba(59, 130, 246, 0.25), 0 2px 6px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transform: hoveredIcon === node.label ? 'translateY(-2px) scale(1.05)' : 'translateY(0) scale(1)',
        ...(hoveredIcon === node.label && {
            boxShadow: isDarkMode 
                ? '0 8px 25px rgba(79, 70, 229, 0.4), 0 4px 12px rgba(0, 0, 0, 0.4)' 
                : '0 8px 25px rgba(59, 130, 246, 0.35), 0 4px 12px rgba(0, 0, 0, 0.15)',
        }),
    });

    const getToggleButtonStyle = () => ({
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        border: 'none',
        background: isDarkMode 
            ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
            : 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
        color: 'white',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
        transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        transform: `${isExpanded ? 'rotate(45deg)' : 'rotate(0deg)'} ${hoveredToggle ? 'scale(1.1) translateY(-2px)' : 'scale(1) translateY(0)'}`,
        boxShadow: isDarkMode 
            ? '0 4px 15px rgba(16, 185, 129, 0.3), 0 2px 6px rgba(0, 0, 0, 0.3)' 
            : '0 4px 15px rgba(6, 182, 212, 0.25), 0 2px 6px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)',
        ...(hoveredToggle && {
            boxShadow: isDarkMode 
                ? '0 8px 25px rgba(16, 185, 129, 0.4), 0 4px 12px rgba(0, 0, 0, 0.4)' 
                : '0 8px 25px rgba(6, 182, 212, 0.35), 0 4px 12px rgba(0, 0, 0, 0.15)',
        }),
    });

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: isDarkMode ? 'rgba(45, 55, 72, 0.9)' : 'rgba(237, 242, 247, 0.9)',
            borderRadius: '28px',
            padding: '6px',
            backdropFilter: 'blur(20px)',
            border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.1)',
            transition: 'all 0.5s ease',
            position: 'relative',
            boxShadow: isDarkMode 
                ? '0 8px 32px rgba(0, 0, 0, 0.5), 0 4px 16px rgba(0, 0, 0, 0.3)' 
                : '0 8px 32px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.05)',
        }}>
            <style>
                {`
                    .toolbar-tooltip {
                        background: ${isDarkMode ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.8)'};
                        color: white;
                        padding: 8px 12px;
                        border-radius: 6px;
                        font-size: 12px;
                        font-weight: 500;
                        white-space: nowrap;
                        opacity: 1;
                        pointer-events: none;
                        transition: opacity 0.2s ease;
                        backdrop-filter: blur(10px);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        z-index: 9999;
                        text-align: center;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                        position: relative;
                    }

                    .tooltip-arrow {
                        position: absolute;
                        top: 100%;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 0;
                        height: 0;
                        border-left: 6px solid transparent;
                        border-right: 6px solid transparent;
                        border-top: 6px solid ${isDarkMode ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.8)'};
                    }

                    .tooltip-title {
                        font-weight: 600;
                        margin-bottom: 4px;
                        color: white;
                        font-size: 12px;
                    }

                    .tooltip-description {
                        font-size: 11px;
                        opacity: 0.8;
                        margin-bottom: 6px;
                        color: #e5e7eb;
                        line-height: 1.3;
                    }

                    .tooltip-shortcut {
                        font-size: 10px;
                        background: rgba(255, 255, 255, 0.15);
                        padding: 2px 6px;
                        border-radius: 4px;
                        font-weight: 600;
                        letter-spacing: 0.5px;
                        display: inline-block;
                        color: white;
                    }
                `}
            </style>
            
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                transition: 'all 0.5s ease',
                maxWidth: isExpanded ? '800px' : '0px',
                opacity: isExpanded ? 1 : 0,
                overflow: 'hidden',
                gap: '2px',
            }}>
                {nodeTypes.map((node) => (
                    <div
                        key={node.type}
                        className="toolbar-item-wrapper"
                        style={{ position: 'relative' }}
                    >
                        <div
                            draggable
                            onDragStart={(event) => {
                                const appData = { nodeType: node.type };
                                event.target.style.cursor = 'grabbing';
                                event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
                                event.dataTransfer.effectAllowed = 'move';
                            }}
                            onDragEnd={(event) => (event.target.style.cursor = 'grab')}
                            onMouseEnter={(e) => {
                                setHoveredIcon(node.label);
                                const rect = e.target.getBoundingClientRect();
                                setTooltipPosition({
                                    x: rect.left + rect.width / 2,
                                    y: rect.top - 80
                                });
                            }}
                            onMouseLeave={() => setHoveredIcon(null)}
                            style={getNodeItemStyle(node)}
                            role="button"
                            tabIndex={0}
                            aria-label={`Drag to add ${node.label} node`}
                            title={`${node.label}: ${node.description}`}
                        >
                            {node.icon}
                        </div>
                        
                        {hoveredIcon === node.label && (
                            <div 
                                className="toolbar-tooltip"
                                style={{
                                    position: 'fixed',
                                    left: `${tooltipPosition.x}px`,
                                    top: `${tooltipPosition.y}px`,
                                    transform: 'translateX(-50%)',
                                }}
                            >
                                <div className="tooltip-title">{node.label} Node</div>
                                <div className="tooltip-description">{node.description}</div>
                                <div className="tooltip-shortcut">Key: {node.shortcut}</div>
                                <div className="tooltip-arrow"></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            
            <div 
                className="toolbar-item-wrapper" 
                style={{ position: 'relative' }}
                onMouseEnter={(e) => {
                    setHoveredToggle(true);
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTooltipPosition({
                        x: rect.left + rect.width / 2,
                        y: rect.top - 80
                    });
                }}
                onMouseLeave={() => setHoveredToggle(false)}
            >
                <button
                    onClick={toggleToolbar}
                    style={getToggleButtonStyle()}
                    aria-label={isExpanded ? "Close node palette" : "Open node palette"}
                    role="button"
                    tabIndex={0}
                    title={isExpanded ? "Hide node palette" : "Show node palette"}
                >
                    +
                </button>
                
                {hoveredToggle && (
                    <div 
                        className="toolbar-tooltip"
                        style={{
                            position: 'fixed',
                            left: `${tooltipPosition.x}px`,
                            top: `${tooltipPosition.y}px`,
                            transform: 'translateX(-50%)',
                        }}
                    >
                        <div className="tooltip-title">Node Palette</div>
                        <div className="tooltip-description">
                            {isExpanded ? 'Click to hide available nodes' : 'Click to show available nodes'}
                        </div>
                        <div className="tooltip-shortcut">Toggle</div>
                        <div className="tooltip-arrow"></div>
                    </div>
                )}
            </div>
        </div>
    );
};
