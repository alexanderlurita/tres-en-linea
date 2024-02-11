import React from 'react'
import { useGameLogic } from '../hooks/useGameLogic'
import { useComputer } from '../hooks/useComputer'

export default function Controls() {
  const { gameMoves, disableReset, resetGame } = useGameLogic()
  const { compActive, toogleComputer } = useComputer()

  return (
    <div className='buttons'>
      <button onClick={resetGame} disabled={disableReset}>
        Reiniciar juego
      </button>

      <button
        onClick={toogleComputer}
        disabled={gameMoves.some((el) => el !== null)}
        style={{
          border: `2px solid ${!compActive ? '#98FB98' : '#FF6961'}`
        }}
      >
        {!compActive ? 'Activar' : 'Desactivar'} CPU
      </button>
    </div>
  )
}
