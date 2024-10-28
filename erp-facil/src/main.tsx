import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ProdutoProvider } from './context/ProdutoContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProdutoProvider>
      <App />
    </ProdutoProvider>
  </StrictMode>,
)
