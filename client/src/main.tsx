import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.tsx'
import { TransactionProvider } from './context/TransactionContext.tsx'
import { ThemeProvider, useTheme } from './context/ThemeContext.tsx'

const ThemedToaster = () => {
  const { theme } = useTheme();
  
  return (
    <Toaster 
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: theme === 'dark' ? '#1a1a1d' : '#ffffff',
          color: theme === 'dark' ? '#fff' : '#000',
          border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
        },
        success: {
          iconTheme: {
            primary: '#4ade80',
            secondary: theme === 'dark' ? '#fff' : '#000',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: theme === 'dark' ? '#fff' : '#000',
          },
        },
      }}
    />
  );
};

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <TransactionProvider>
      <StrictMode>
        <App />
        <ThemedToaster />
      </StrictMode>
    </TransactionProvider>
  </ThemeProvider>
)
