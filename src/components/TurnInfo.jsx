import { useGameLogic } from '../hooks/useGameLogic.jsx'

export default function TurnInfo() {
  const { turn } = useGameLogic()
  return <div className='turn-info'>Turno de {turn}</div>
}
