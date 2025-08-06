// toolbar.js

import { useState } from 'react';
import { useDarkMode } from './DarkModeContext';

export const PipelineToolbar = () => {
    const { isDarkMode } = useDarkMode();
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleToolbar = () => {
        setIsExpanded(!isExpanded);
    };

    const nodeTypes = [
        { type: 'customInput', label: 'Input' },
        { type: 'llm', label: 'LLM' },
        { type: 'customOutput', label: 'Output' },
        { type: 'text', label: 'Text' },
        { type: 'document', label: 'Document' },
        { type: 'filter', label: 'Filter' },
        { type: 'merge', label: 'Merge' },
        { type: 'split', label: 'Split' },
        { type: 'visualize', label: 'Visualize' }
    ];

    return (
        <>
            {/* SVG Filter for Gooey Effect */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    <filter id="gooey">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="gooey" />
                        <feComposite in="SourceGraphic" in2="gooey" operator="atop"/>
                    </filter>
                </defs>
            </svg>

            {/* Floating Gooey Blobs */}
            <div style={{
                position: 'fixed',
                top: '20px',
                left: '20px',
                zIndex: 1000,
                filter: 'url(#gooey)'
            }}>
                {/* Plus Button Blob */}
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
                        boxShadow: isDarkMode 
                            ? '0 8px 32px rgba(0,0,0,0.4)' 
                            : '0 8px 32px rgba(49,130,206,0.3)',
                        transform: isExpanded ? 'rotate(45deg) scale(1.05)' : 'rotate(0deg) scale(1)',
                        zIndex: 10,
                        position: 'relative'
                    }}
                    onMouseOver={(e) => {
                        if (!isExpanded) {
                            e.target.style.transform = 'scale(1.1)';
                        }
                    }}
                    onMouseOut={(e) => {
                        if (!isExpanded) {
                            e.target.style.transform = 'scale(1)';
                        }
                    }}
                >
                    +
                </button>

                {/* List Blob - appears below plus button */}
                <div style={{
                    position: 'absolute',
                    top: isExpanded ? '64px' : '24px', // 64px when expanded, 24px (center of plus) when collapsed
                    left: '0px',
                    width: '120px',
                    backgroundColor: isDarkMode ? '#4a5568' : '#3182ce',
                    borderRadius: '16px',
                    padding: '10px',
                    margin: '10px 0 0 0',
                    transition: 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                    transformOrigin: 'center bottom',
                    transform: isExpanded 
                        ? 'scale(1) translateY(0px)' 
                        : 'scale(0) translateY(-40px)', // -40px to center on plus button
                    opacity: isExpanded ? 1 : 0,
                    boxShadow: isDarkMode 
                        ? '0 8px 32px rgba(0,0,0,0.4)' 
                        : '0 8px 32px rgba(49,130,206,0.3)',
                    overflow: 'hidden',
                    maxHeight: isExpanded ? '400px' : '0px'
                }}>
                    {nodeTypes.map((node, index) => (
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
                            style={{
                                padding: '5px 5px',
                                // marginBottom: '1px',
                                borderRadius: '8px',
                                backgroundColor: 'transparent',
                                color: 'white',
                                cursor: 'grab',
                                fontSize: '16px',
                                fontWeight: '600',
                                transition: 'all 0.3s ease',
                                opacity: isExpanded ? 1 : 0,
                                transform: isExpanded ? 'translateY(0px) scale(1)' : 'translateY(-20px) scale(0.8)',
                                userSelect: 'none'
                            }}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = isDarkMode ? '#374151' : '#2563eb';
                                e.target.style.transform = 'translateY(0px) scale(1.02) translateX(4px)';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.transform = 'translateY(0px) scale(1) translateX(0px)';
                            }}
                        >
                            {node.label}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
