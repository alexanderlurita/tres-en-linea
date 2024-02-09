import Board from './components/Board.jsx'
import TurnInfo from './components/TurnInfo.jsx'
import WinnerModal from './components/WinnerModal.jsx'
import './App.css'
import Controls from './components/Controls.jsx'

export default function App() {
  return (
    <main className='game-container'>
      <h1>Tic tac toe</h1>

      <Controls />

      <Board />

      <TurnInfo />

      <WinnerModal />
    </main>
  )
}
