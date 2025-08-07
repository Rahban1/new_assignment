// submit.js

import { useState } from 'react';
import { useDarkMode } from './DarkModeContext';
import { useStore } from './store';

export const SubmitButton = () => {
    const { isDarkMode } = useDarkMode();
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [lastSubmissionResult, setLastSubmissionResult] = useState(null);

    const hasNodes = nodes.length > 0;

    const handleSubmit = async () => {
        if (isSubmitting || !hasNodes) return;
        
        setIsSubmitting(true);
        setLastSubmissionResult(null);

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
                setLastSubmissionResult({ success: false, message: result.error });
                alert(`Error: ${result.error}`);
            } else {
                const dagStatus = result.is_dag ? 'Yes, it is a DAG' : 'No, it contains cycles';
                const message = `Pipeline Analysis:
Number of nodes: ${result.num_nodes}
Number of edges: ${result.num_edges}
Is it a DAG? ${dagStatus}`;
                setLastSubmissionResult({ success: true, message });
                alert(message);
            }
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            setLastSubmissionResult({ success: false, message: 'Network error occurred' });
            alert('Error submitting pipeline. Please check the console for details.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getButtonStyle = () => ({
        position: 'relative',
        padding: '0',
        width: '56px',
        height: '56px',
        borderRadius: '28px',
        border: 'none',
        background: hasNodes 
            ? (isDarkMode 
                ? 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)' 
                : 'linear-gradient(135deg, #10b981 0%, #059669 100%)')
            : (isDarkMode ? '#374151' : '#d1d5db'),
        color: hasNodes ? 'white' : (isDarkMode ? '#6b7280' : '#9ca3af'),
        cursor: hasNodes && !isSubmitting ? 'pointer' : 'not-allowed',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: hasNodes 
            ? (isDarkMode 
                ? '0 8px 25px rgba(34, 197, 94, 0.3), 0 4px 10px rgba(0, 0, 0, 0.3)' 
                : '0 8px 25px rgba(16, 185, 129, 0.25), 0 4px 10px rgba(0, 0, 0, 0.1)')
            : (isDarkMode 
                ? '0 2px 8px rgba(0, 0, 0, 0.3)' 
                : '0 2px 8px rgba(0, 0, 0, 0.1)'),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        transform: isSubmitting ? 'scale(0.95)' : 'scale(1)',
        backdropFilter: 'blur(10px)',
    });

    const getHoverStyle = () => ({
        transform: hasNodes && !isSubmitting ? 'translateY(-2px) scale(1.02)' : 'scale(1)',
        boxShadow: hasNodes && !isSubmitting
            ? (isDarkMode 
                ? '0 12px 35px rgba(34, 197, 94, 0.4), 0 6px 15px rgba(0, 0, 0, 0.4)' 
                : '0 12px 35px rgba(16, 185, 129, 0.35), 0 6px 15px rgba(0, 0, 0, 0.15)')
            : getButtonStyle().boxShadow,
    });

    const renderIcon = () => {
        if (isSubmitting) {
            return (
                <div
                    style={{
                        width: '24px',
                        height: '24px',
                        border: '3px solid rgba(255, 255, 255, 0.3)',
                        borderTop: '3px solid white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                    }}
                />
            );
        }

        if (!hasNodes) {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM13 17h-2v-6h2v6zm0-8h-2V7h2v2z" fill="currentColor" />
                </svg>
            );
        }

        return (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path 
                    d="M21 3L3 10.53l8.72 2.1L14.4 21Z" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    style={{
                        filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))',
                    }}
                />
            </svg>
        );
    };

    const getTooltipText = () => {
        if (!hasNodes) return 'Add nodes to your pipeline first';
        if (isSubmitting) return 'Submitting pipeline...';
        return `Submit pipeline (${nodes.length} nodes)`;
    };

    return (
        <div 
            style={{ 
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    
                    @keyframes pulse {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.7; }
                    }

                    .submit-button-tooltip {
                        position: absolute;
                        bottom: 70px;
                        left: 50%;
                        transform: translateX(-50%);
                        background: ${isDarkMode ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.8)'};
                        color: white;
                        padding: 8px 12px;
                        border-radius: 6px;
                        font-size: 12px;
                        font-weight: 500;
                        white-space: nowrap;
                        opacity: 0;
                        pointer-events: none;
                        transition: opacity 0.2s ease;
                        backdrop-filter: blur(10px);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        z-index: 1000;
                    }

                    .submit-button-wrapper:hover .submit-button-tooltip {
                        opacity: 1;
                    }

                    .submit-button-wrapper:hover .submit-button-tooltip::after {
                        content: '';
                        position: absolute;
                        top: 100%;
                        left: 50%;
                        transform: translateX(-50%);
                        border: 6px solid transparent;
                        border-top-color: ${isDarkMode ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.8)'};
                    }
                `}
            </style>
            
            <div className="submit-button-wrapper" style={{ position: 'relative' }}>
                <button 
                    type="submit"
                    onClick={handleSubmit}
                    disabled={!hasNodes || isSubmitting}
                    style={getButtonStyle()}
                    onMouseEnter={(e) => {
                        if (hasNodes && !isSubmitting) {
                            Object.assign(e.target.style, getHoverStyle());
                        }
                    }}
                    onMouseLeave={(e) => {
                        Object.assign(e.target.style, getButtonStyle());
                    }}
                    onMouseDown={(e) => {
                        if (hasNodes && !isSubmitting) {
                            e.target.style.transform = 'translateY(0) scale(0.98)';
                        }
                    }}
                    onMouseUp={(e) => {
                        if (hasNodes && !isSubmitting) {
                            Object.assign(e.target.style, getHoverStyle());
                        }
                    }}
                    aria-label={getTooltipText()}
                    role="button"
                    tabIndex={0}
                >
                    {renderIcon()}
                    
                    {lastSubmissionResult && (
                        <div
                            style={{
                                position: 'absolute',
                                top: '-2px',
                                right: '-2px',
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                backgroundColor: lastSubmissionResult.success ? '#10b981' : '#ef4444',
                                animation: 'pulse 2s ease-in-out',
                            }}
                        />
                    )}
                </button>
                
                <div className="submit-button-tooltip">
                    {getTooltipText()}
                </div>
            </div>
        </div>
    );
}
