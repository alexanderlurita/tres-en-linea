import './App.css'
import WinnerModal from './components/WinnerModal'
import Square from './components/Square'
import TurnInfo from './components/TurnInfo'
import { useGameLogic } from './hooks/useGameLogic'

export default function App() {
  const { gameMoves, turn, winner, disableReset, updateSquare, resetGame } =
    useGameLogic()

  return (
    <main className='game-container'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame} disabled={disableReset}>
        Reiniciar juego
      </button>

      <div className='card-grid'>
        {gameMoves.map((el, index) => (
          <Square key={index} symbol={el} update={updateSquare} index={index} />
        ))}
      </div>

      <TurnInfo turn={turn} />

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}
