import { useState } from "react";
import "./App.css";
import { TURNS, WINNER_COMBOS } from "./constans";
import confetti from "canvas-confetti";
import WinnerModal from "./components/WinnerModal";

function App() {
  const [gameMoves, setGameMoves] = useState(new Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);

  const [winner, setWinner] = useState(null);

  const updateSquare = (index) => {
    const newGameMoves = [...gameMoves];

    if (newGameMoves[index] || winner !== null) return;

    newGameMoves[index] = turn;
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;

    setGameMoves(newGameMoves);
    setTurn(newTurn);

    const winnerStatus = verifyWinner(newGameMoves);

    if (winnerStatus) {
      confetti();
      setWinner(winnerStatus);
    } else if (winnerStatus === false) {
      setWinner(winnerStatus);
    }
  };

  const verifyWinner = (gameMoves) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        gameMoves[a] &&
        gameMoves[a] === gameMoves[b] &&
        gameMoves[a] === gameMoves[c]
      ) {
        return gameMoves[a];
      }
    }

    if (gameMoves.every((move) => move !== null)) {
      return false;
    }

    return null;
  };

  const resetGame = () => {
    setGameMoves(new Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  };

  return (
    <main className="game-container">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reiniciar juego</button>

      <div className="card-grid">
        {gameMoves.map((el, index) => (
          <div
            className="card-item"
            key={index}
            onClick={() => updateSquare(index)}
          >
            {el}
          </div>
        ))}
      </div>

      <div className="turn-info">El turno es de: {turn}</div>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
