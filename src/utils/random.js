export function generateNumber({ min, max, excluded = [] }) {
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('Los números deben ser válidos')
  }

  if (min >= max) {
    throw new Error('El mínimo debe ser menor que el máximo')
  }

  let randomNumber

  do {
    randomNumber = Math.ceil(Math.random() * (max - min + 1)) + min - 1
  } while (excluded.includes(randomNumber))

  return randomNumber
}
