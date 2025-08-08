import { useState } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { DarkModeProvider, useDarkMode } from './contexts/DarkModeContext';
import { DarkModeToggle } from './DarkModeToggle';
import { Toaster } from 'sonner';

function AppContent() {
  const { isDarkMode } = useDarkMode();
  const [isToolbarExpanded, setIsToolbarExpanded] = useState(false);

  return (
    <div style={{
      height: '100vh',
      backgroundColor: 'var(--bg)',
      color: 'var(--text)',
      transition: 'background var(--duration) var(--easing), color var(--duration) var(--easing)',
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
        transition: 'transform var(--duration-slow) var(--easing)',
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
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
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
