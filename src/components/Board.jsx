import { useGameLogic } from '../hooks/useGameLogic.jsx'
import Square from './Square.jsx'

export default function Board() {
  const { gameMoves, updateSquare } = useGameLogic()

  return (
    <div className='card-grid'>
      {gameMoves.map((el, index) => (
        <Square key={index} symbol={el} update={updateSquare} index={index} />
      ))}
    </div>
  )
}
