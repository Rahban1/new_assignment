
import { useState } from 'react';
import { toast } from 'sonner';

import { useStore } from './store';
import { parsePipeline } from './services/pipelines';

export const SubmitButton = () => {
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
            const result = await parsePipeline(pipeline);

            if (result.error) {
                setLastSubmissionResult({ success: false, message: result.error });
                toast.error(`Error: ${result.error}`);
            } else {
                const dagStatus = result.is_dag ? 'Yes, it is a DAG' : 'No, it contains cycles';
                const message = `Pipeline Analysis:\nNumber of nodes: ${result.num_nodes}\nNumber of edges: ${result.num_edges}\nIs it a DAG? ${dagStatus}`;
                setLastSubmissionResult({ success: true, message });
                toast.success(message);
            }
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            setLastSubmissionResult({ success: false, message: 'Network error occurred' });
            toast.error('Error submitting pipeline. Please check the console for details.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getButtonStyle = () => ({
        position: 'relative',
        padding: 0,
        width: '56px',
        height: '56px',
        borderRadius: '28px',
        border: 'none',
        background: hasNodes ? 'var(--primary)' : 'var(--bg-muted)',
        color: hasNodes ? 'white' : 'var(--text-muted)',
        cursor: hasNodes && !isSubmitting ? 'pointer' : 'not-allowed',
        transition: 'transform var(--duration) var(--easing), box-shadow var(--duration) var(--easing), background var(--duration) var(--easing), color var(--duration) var(--easing)',
        boxShadow: hasNodes 
            ? '0 16px 38px color-mix(in srgb, var(--primary) 28%, transparent), var(--shadow-md)'
            : 'var(--shadow-sm)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        transform: isSubmitting ? 'scale(0.96)' : 'scale(1)'
    });

    const getHoverStyle = () => ({
        transform: hasNodes && !isSubmitting ? 'translateY(-1px) scale(1.02)' : 'scale(1)',
        boxShadow: hasNodes && !isSubmitting ? '0 20px 42px color-mix(in srgb, var(--primary) 32%, transparent), var(--shadow-lg)' : getButtonStyle().boxShadow,
    });

    const renderIcon = () => {
        if (isSubmitting) {
            return (
                <div style={{
                    width: '24px',
                    height: '24px',
                    border: '3px solid rgba(255, 255, 255, 0.3)',
                    borderTop: '3px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }} />
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
                    .submit-button-tooltip {
                        position: absolute;
                        bottom: 70px;
                        left: 50%;
                        transform: translateX(-50%);
                        z-index: 1000;
                        opacity: 0;
                        transition: opacity var(--duration) var(--easing);
                    }

                    .submit-button-wrapper:hover .submit-button-tooltip {
                        opacity: 1;
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
                            Object.assign(e.currentTarget.style, getHoverStyle());
                        }
                    }}
                    onMouseLeave={(e) => {
                        Object.assign(e.currentTarget.style, getButtonStyle());
                    }}
                    onMouseDown={(e) => {
                        if (hasNodes && !isSubmitting) {
                            e.currentTarget.style.transform = 'translateY(0) scale(0.98)';
                        }
                    }}
                    onMouseUp={(e) => {
                        if (hasNodes && !isSubmitting) {
                            Object.assign(e.currentTarget.style, getHoverStyle());
                        }
                    }}
                    aria-label={getTooltipText()}

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
                
                <div className="submit-button-tooltip ds-tooltip" style={{ position: 'absolute' }}>
                    <div className="ds-tooltip__title">Submit</div>
                    <div className="ds-tooltip__desc">{getTooltipText()}</div>
                    <div className="ds-tooltip__arrow"></div>
                </div>
            </div>
        </div>
    );
}
