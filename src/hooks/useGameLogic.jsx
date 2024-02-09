import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import { TURNS, WINNER_COMBOS } from '../constans'

export function useGameLogic() {
  const [gameMoves, setGameMoves] = useState(new Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)
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
  }

  useEffect(() => {
    const hasGameMoves = !gameMoves.some((el) => el !== null)
    setDisableReset(hasGameMoves)
  }, [gameMoves])

  return { gameMoves, turn, winner, disableReset, updateSquare, resetGame }
}
