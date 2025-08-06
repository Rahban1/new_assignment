// submit.js

import { useDarkMode } from './DarkModeContext';

export const SubmitButton = () => {
    const { isDarkMode } = useDarkMode();

    return (
        <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            transition: 'all 0.3s ease'
        }}>
            <button 
                type="submit"
                style={{
                    padding: '12px 24px',
                    fontSize: '14px',
                    fontWeight: '600',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: isDarkMode ? '#48bb78' : '#38a169',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isDarkMode 
                        ? '0 2px 4px rgba(0,0,0,0.4)' 
                        : '0 2px 4px rgba(0,0,0,0.1)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
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
                Submit
            </button>
        </div>
    );
}
