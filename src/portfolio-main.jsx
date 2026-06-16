import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import PortfolioProject from './pages/projects/PortfolioProject.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <PortfolioProject />
    </StrictMode>,
)