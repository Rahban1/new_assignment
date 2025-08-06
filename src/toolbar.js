// toolbar.js

import { DraggableNode } from './draggableNode';
import { useDarkMode } from './DarkModeContext';

export const PipelineToolbar = () => {
    const { isDarkMode } = useDarkMode();

    return (
        <div style={{ 
            padding: '10px',
            backgroundColor: isDarkMode ? '#2d3748' : '#f7fafc',
            borderBottom: `1px solid ${isDarkMode ? '#4a5568' : '#e2e8f0'}`,
            transition: 'all 0.3s ease'
        }}>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='document' label='Document' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='merge' label='Merge' />
                <DraggableNode type='split' label='Split' />
                <DraggableNode type='visualize' label='Visualize' />
            </div>
        </div>
    );
};
