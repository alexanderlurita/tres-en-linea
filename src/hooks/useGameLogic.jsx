import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import { TURNS, WINNER_COMBOS } from '../constans'
import { resetGameFromStorage, saveGameToStorage } from '../utils/storage'

export function useGameLogic() {
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

  const updateSquare = (index) => {
    const newGameMoves = [...gameMoves]

    if (newGameMoves[index] || winner !== null) return

    newGameMoves[index] = turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X

    setGameMoves(newGameMoves)
    setTurn(newTurn)

    const winnerStatus = verifyWinner(newGameMoves)

    if (winnerStatus) {
      confetti()
      setWinner(winnerStatus)
    } else if (winnerStatus === false) {
      setWinner(winnerStatus)
    }

    saveGameToStorage({
      game: newGameMoves,
      turn: newTurn,
      winner: winnerStatus
    })
  }

  const verifyWinner = (gameMoves) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        gameMoves[a] &&
        gameMoves[a] === gameMoves[b] &&
        gameMoves[a] === gameMoves[c]
      ) {
        return gameMoves[a]
      }
    }

    if (gameMoves.every((move) => move !== null)) {
      return false
    }

    return null
  }

  const resetGame = () => {
    setGameMoves(new Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    setDisableReset(true)

    resetGameFromStorage()
  }

  useEffect(() => {
    const hasGameMoves = !gameMoves.some((el) => el !== null)
    setDisableReset(hasGameMoves)
  }, [gameMoves])

  return { gameMoves, turn, winner, disableReset, updateSquare, resetGame }
}
