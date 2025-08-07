// submit.js

import { useDarkMode } from './DarkModeContext';
import { useStore } from './store';

export const SubmitButton = () => {
    const { isDarkMode } = useDarkMode();
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const handleSubmit = async () => {
        const pipeline = {
            nodes: nodes,
            edges: edges
        };

        try {
            const formData = new FormData();
            formData.append('pipeline', JSON.stringify(pipeline));

            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            
            if (result.error) {
                alert(`Error: ${result.error}`);
            } else {
                const dagStatus = result.is_dag ? 'Yes, it is a DAG' : 'No, it contains cycles';
                alert(`Pipeline Analysis:
Number of nodes: ${result.num_nodes}
Number of edges: ${result.num_edges}
Is it a DAG? ${dagStatus}`);
            }
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert('Error submitting pipeline. Please check the console for details.');
        }
    };

    return (
        <div>
            <button 
                type="submit"
                onClick={handleSubmit}
                style={{
                    padding: '12px',
                    width: '48px',
                    height: '48px',
                    fontSize: '14px',
                    fontWeight: '600',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: isDarkMode ? '#48bb78' : '#38a169',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isDarkMode 
                        ? '0 2px 4px rgba(0,0,0,0.4)' 
                        : '0 2px 4px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onMouseOver={(e) => {
                    e.target.style.backgroundColor = isDarkMode ? '#38a169' : '#2f855a';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = isDarkMode 
                        ? '0 4px 8px rgba(0,0,0,0.5)' 
                        : '0 4px 8px rgba(0,0,0,0.15)';
                }}
                onMouseOut={(e) => {
                    e.target.style.backgroundColor = isDarkMode ? '#48bb78' : '#38a169';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = isDarkMode 
                        ? '0 2px 4px rgba(0,0,0,0.4)' 
                        : '0 2px 4px rgba(0,0,0,0.1)';
                }}
            >
                <svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24" id="paper-plane-2" data-name="Line Color" xmlns="http://www.w3.org/2000/svg" className="icon line-color">
                  <path id="primary" d="M21,3,3,10.53l8.72,2.1L14.4,21Z" style={{ stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2 }}></path>
                </svg>
            </button>
        </div>
    );
}
