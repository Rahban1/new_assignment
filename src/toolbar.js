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
        width: '56px',
        height: '56px',
        margin: '0 4px',
        borderRadius: '28px',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        color: 'var(--text)',
        cursor: 'grab',
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        transition: 'transform var(--duration) var(--easing), box-shadow var(--duration) var(--easing), background var(--duration) var(--easing), color var(--duration) var(--easing)',
        boxShadow: 'var(--shadow-sm)',
        transform: hoveredIcon === node.label ? 'translateY(-2px) scale(1.04)' : 'translateY(0) scale(1)',
        ...(hoveredIcon === node.label && {
            boxShadow: 'var(--shadow-md)'
        }),
    });

    const getToggleButtonStyle = () => ({
        width: '56px',
        height: '56px',
        borderRadius: '28px',
        border: '1px solid var(--border)',
        background: 'var(--surface)',
        color: 'var(--text)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
        transition: 'transform var(--duration-slow) var(--easing), box-shadow var(--duration) var(--easing), background var(--duration) var(--easing), color var(--duration) var(--easing)',
        transform: `${isExpanded ? 'rotate(45deg)' : 'rotate(0deg)'} ${hoveredToggle ? 'scale(1.06) translateY(-2px)' : 'scale(1) translateY(0)'}`,
        boxShadow: hoveredToggle ? 'var(--shadow-md)' : 'var(--shadow-sm)'
    });

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            position: 'relative',
        }}>
            <style>
                {`
                    .toolbar-tooltip { all: initial; }
                    .toolbar-item-wrapper { position: relative; }
                    .toolbar-item-tooltip { 
                        position: absolute; 
                        bottom: calc(100% + 12px); 
                        left: 50%; 
                        transform: translateX(-50%);
                        opacity: 0; 
                        transition: opacity var(--duration) var(--easing);
                        pointer-events: none;
                        z-index: 1000;
                    }
                    .toolbar-item-wrapper:hover .toolbar-item-tooltip { opacity: 1; }
                `}
            </style>
            
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                maxWidth: isExpanded ? '800px' : '0px',
                opacity: isExpanded ? 1 : 0,
                overflow: 'visible',
                gap: '8px',
                transformOrigin: 'right center',
                transform: isExpanded ? 'scaleX(1)' : 'scaleX(0)',
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
                            onMouseEnter={() => setHoveredIcon(node.label)}
                            onMouseLeave={() => setHoveredIcon(null)}
                            style={getNodeItemStyle(node)}
                            role="button"
                            tabIndex={0}
                            aria-label={`Drag to add ${node.label} node`}
                            title={undefined}
                        >
                            {node.icon}
                        </div>
                        <div className="ds-tooltip toolbar-item-tooltip">
                            <div className="ds-tooltip__title">{node.label}</div>
                            <div className="ds-tooltip__arrow"></div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div 
                className="toolbar-item-wrapper" 
                style={{ position: 'relative' }}
                onMouseEnter={() => setHoveredToggle(true)}
                onMouseLeave={() => setHoveredToggle(false)}
            >
                <button
                    onClick={toggleToolbar}
                    style={getToggleButtonStyle()}
                    aria-label={isExpanded ? "Close node palette" : "Open node palette"}
                    role="button"
                    tabIndex={0}
                    title={undefined}
                >
                    +
                </button>
                <div className="ds-tooltip toolbar-item-tooltip">
                    <div className="ds-tooltip__title">Node Palette</div>
                    <div className="ds-tooltip__arrow"></div>
                </div>
            </div>
        </div>
    );
};
