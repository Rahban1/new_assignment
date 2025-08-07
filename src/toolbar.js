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

    const nodeTypes = [
        { type: 'customInput', label: 'Input', icon: <InputIcon /> },
        { type: 'llm', label: 'LLM', icon: <LLMIcon /> },
        { type: 'customOutput', label: 'Output', icon: <OutputIcon /> },
        { type: 'text', label: 'Text', icon: <TextIcon /> },
        { type: 'document', label: 'Document', icon: <DocumentIcon /> },
        { type: 'filter', label: 'Filter', icon: <FilterIcon /> },
        { type: 'merge', label: 'Merge', icon: <MergeIcon /> },
        { type: 'split', label: 'Split', icon: <SplitIcon /> },
        { type: 'visualize', label: 'Visualize', icon: <VisualizeIcon /> }
    ];

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: isDarkMode ? 'rgba(45, 55, 72, 0.8)' : 'rgba(237, 242, 247, 0.8)',
            borderRadius: '24px',
            padding: '5px',
            backdropFilter: 'blur(10px)',
            border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
            transition: 'all 0.5s ease',
            position: 'relative'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                transition: 'all 0.5s ease',
                maxWidth: isExpanded ? '800px' : '0px',
                opacity: isExpanded ? 1 : 0,
                overflow: 'hidden',
            }}>
                {nodeTypes.map((node) => (
                    <div
                        key={node.type}
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
                        style={{
                            padding: '10px',
                            margin: '0 5px',
                            borderRadius: '16px',
                            backgroundColor: isDarkMode ? '#374151' : '#2563eb',
                            color: 'white',
                            cursor: 'grab',
                            userSelect: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative'
                        }}
                    >
                        {node.icon}
                        {hoveredIcon === node.label && (
                            <div style={{
                                position: 'absolute',
                                top: '-10%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                backgroundColor: '#333',
                                color: 'white',
                                padding: '5px 10px',
                                borderRadius: '4px',
                                fontSize: '14px',
                                whiteSpace: 'nowrap',
                            }}>
                                {node.label}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <button
                onClick={toggleToolbar}
                style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: isDarkMode ? '#4a5568' : '#3182ce',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                    transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)',
                }}
            >
                +
            </button>
        </div>
    );
};
