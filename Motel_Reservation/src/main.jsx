
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter as Router} from 'react-router-dom'
import AppContextProvider from './content/AppContext'
createRoot(document.getElementById('root')).render(
 
    <Router>
        <AppContextProvider>
    <App />
        </AppContextProvider>
    </Router>
 
)
