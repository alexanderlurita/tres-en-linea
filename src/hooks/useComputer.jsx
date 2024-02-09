import { useContext, useEffect } from 'react'
import { generateNumber } from '../utils/random.js'
import { GameContext } from '../contexts/game.jsx'

export function useComputer() {
  const { compActive, setCompActive } = useContext(GameContext)

  const toogleComputer = () => setCompActive(!compActive)

  const computerMove = (gameMoves = []) => {
    const nonNullIndices = gameMoves
      .map((move, index) => (move !== null ? index : null))
      .filter((index) => index !== null)

    const newMove = generateNumber({ min: 0, max: 8, excluded: nonNullIndices })

    return newMove
  }

  useEffect(() => {
    if (compActive) {
      localStorage.setItem('cpu', String(compActive))
    } else {
      localStorage.removeItem('cpu')
    }
  }, [compActive])

  return { compActive, toogleComputer, computerMove }
}
