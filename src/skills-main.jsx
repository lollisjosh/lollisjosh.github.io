import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import Skills from './pages/Skills.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Skills />
    </StrictMode>,
)