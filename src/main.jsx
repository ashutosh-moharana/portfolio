import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ColorProvider } from './contexts/ColorContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ColorProvider>
        <App />
      </ColorProvider>
    </BrowserRouter>
  </StrictMode>,
)
