export default function Square({ symbol, update, index }) {
  return (
    <div className='card-item' onClick={() => update(index)}>
      {symbol}
    </div>
  )
}
