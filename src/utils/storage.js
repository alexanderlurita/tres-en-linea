export function saveGameToStorage({ game, turn, winner }) {
  localStorage.setItem('gameProgress', JSON.stringify(game))
  localStorage.setItem('turnProgress', JSON.stringify(turn))
  localStorage.setItem('winner', JSON.stringify(winner))
}

export function resetGameFromStorage() {
  localStorage.removeItem('gameProgress')
  localStorage.removeItem('turnProgress')
  localStorage.removeItem('winner')
}
