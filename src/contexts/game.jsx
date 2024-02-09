import { createContext, useState } from 'react'
import { TURNS } from '../constants.js'

export const GameContext = createContext()

export function GameProvider({ children }) {
  const [gameMoves, setGameMoves] = useState(() => {
    const isGameInProgress = localStorage.getItem('gameProgress')

    return isGameInProgress
      ? JSON.parse(isGameInProgress)
      : new Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const isTurnInProgress = localStorage.getItem('turnProgress')

    return isTurnInProgress ? JSON.parse(isTurnInProgress) : TURNS.X
  })

  const [winner, setWinner] = useState(() => {
    const isWinner = localStorage.getItem('winner')

    return isWinner ? JSON.parse(isWinner) : null
  })

  const [disableReset, setDisableReset] = useState(true)

  const [compActive, setCompActive] = useState(
    Boolean(localStorage.getItem('cpu'))
  )

  return (
    <GameContext.Provider
      value={{
        gameMoves,
        setGameMoves,
        turn,
        setTurn,
        winner,
        setWinner,
        disableReset,
        setDisableReset,
        compActive,
        setCompActive
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
