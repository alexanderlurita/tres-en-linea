import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { GameProvider } from './contexts/game.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <GameProvider>
    <App />
  </GameProvider>
)
