import { useGameLogic } from '../hooks/useGameLogic.jsx'

export default function WinnerModal() {
  const { winner, resetGame } = useGameLogic()

  if (winner === null) return null

  return (
    <section className='winner'>
      <div className='text'>
        <h2>{winner === false ? 'Empate' : 'Ganó:'}</h2>
        <header className='win'>{winner}</header>
        <footer>
          <button onClick={resetGame}>Nueva partida</button>
        </footer>
      </div>
    </section>
  )
}
