// toolbar.js

import { useDarkMode } from './DarkModeContext';

export const PipelineToolbar = ({ isExpanded, toggleToolbar }) => {
    const { isDarkMode } = useDarkMode();

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
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: isDarkMode ? 'rgba(45, 55, 72, 0.8)' : 'rgba(237, 242, 247, 0.8)',
            borderRadius: '24px',
            padding: '5px',
            backdropFilter: 'blur(10px)',
            border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
            transition: 'all 0.5s ease'
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
                        style={{
                            padding: '5px 10px',
                            margin: '0 5px',
                            borderRadius: '16px',
                            backgroundColor: isDarkMode ? '#374151' : '#2563eb',
                            color: 'white',
                            cursor: 'grab',
                            fontSize: '16px',
                            fontWeight: '600',
                            userSelect: 'none',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {node.label}
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
