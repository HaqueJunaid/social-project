import { createRoot } from 'react-dom/client'
import { LoginProvider } from './Hooks/LoginProvider.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <LoginProvider>
        <App />
    </LoginProvider>
)
