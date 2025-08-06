import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { DarkModeProvider, useDarkMode } from './DarkModeContext';
import { DarkModeToggle } from './DarkModeToggle';

function AppContent() {
  const { isDarkMode } = useDarkMode();

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
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
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
