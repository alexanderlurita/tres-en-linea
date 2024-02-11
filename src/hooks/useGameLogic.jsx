import { useContext, useEffect } from 'react'
import confetti from 'canvas-confetti'
import { TURNS, WINNER_COMBOS } from '../constants.js'
import { resetGameFromStorage, saveGameToStorage } from '../utils/storage.js'
import { GameContext } from '../contexts/game.jsx'
import { useComputer } from './useComputer.jsx'

export function useGameLogic() {
  const {
    gameMoves,
    setGameMoves,
    turn,
    setTurn,
    winner,
    setWinner,
    disableReset,
    setDisableReset,
    compActive
  } = useContext(GameContext)

  const { computerMove } = useComputer()

  const updateSquare = (index) => {
    const newGameMoves = [...gameMoves]

    if (newGameMoves[index] || winner !== null) return

    newGameMoves[index] = turn
    const newTurn = turn === TURNS.X && !compActive ? TURNS.O : TURNS.X

    let winnerStatus

    const checkWinnerStatus = () => {
      winnerStatus = verifyWinner(newGameMoves)
      if (winnerStatus) {
        confetti()
      }
      setWinner(winnerStatus)
    }

    checkWinnerStatus()

    if (winnerStatus === null && compActive) {
      const newMoveComp = computerMove(newGameMoves)
      newGameMoves[newMoveComp] = TURNS.O

      checkWinnerStatus()
    }

    setGameMoves(newGameMoves)
    setTurn(newTurn)

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
