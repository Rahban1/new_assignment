import { useState } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { DarkModeProvider, useDarkMode } from './DarkModeContext';
import { DarkModeToggle } from './DarkModeToggle';
import { Toaster } from 'sonner';

function AppContent() {
  const { isDarkMode } = useDarkMode();
  const [isToolbarExpanded, setIsToolbarExpanded] = useState(false);

  return (
    <div style={{
      height: '100vh',
      backgroundColor: isDarkMode ? '#1a202c' : '#ffffff',
      color: isDarkMode ? '#f7fafc' : '#2d3748',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      <DarkModeToggle />
      <PipelineUI />
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px',
        transition: 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      }}>
        <PipelineToolbar isExpanded={isToolbarExpanded} toggleToolbar={() => setIsToolbarExpanded(!isToolbarExpanded)} />
        <SubmitButton />
      </div>
      <Toaster 
        theme={isDarkMode ? 'dark' : 'light'}
        position="top-center"
        richColors
        closeButton
        toastOptions={{
          style: {
            background: isDarkMode ? '#1f2937' : '#ffffff',
            border: isDarkMode ? '1px solid #374151' : '1px solid #e5e7eb',
            color: isDarkMode ? '#f9fafb' : '#111827',
            fontSize: '16px',
            padding: '16px 20px',
            minWidth: '400px',
            maxWidth: '500px',
          }
        }}
      />
    </div>
  );
}

function App() {
  return (
    <DarkModeProvider>
      <AppContent />
    </DarkModeProvider>
  );
}

export default App;
