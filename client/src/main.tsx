import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TransactionProvider } from './context/TransactionContext.tsx'

createRoot(document.getElementById('root')!).render(
  <TransactionProvider>
  <StrictMode>
    <App />
  </StrictMode>,
  </TransactionProvider>
)
