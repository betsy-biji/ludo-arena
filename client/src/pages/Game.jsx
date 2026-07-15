import GameHeader from "../components/game/GameHeader";
import GamePlayerCard from "../components/game/GamePlayerCard";
import GameBoard from "../components/game/GameBoard";
import DicePanel from "../components/game/DicePanel";

import useGameSocket from "../hooks/useGameSocket";

function Game() {
  const {
    game,
    loading,
    rollDice,
    moveToken,
    winner,
    restartGame,
  } = useGameSocket();

  if (loading || !game) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>

          <h1 className="text-3xl font-bold text-white">
            Loading Game...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">

      {/* Winner Popup */}

      {winner && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-white rounded-3xl shadow-2xl p-10 w-[420px] text-center">

            <h1 className="text-6xl mb-4">🏆</h1>

            <h2 className="text-3xl font-bold mb-2">
              {winner.winner} Wins!
            </h2>

            <p className="text-slate-600 mb-8">
              Congratulations!
            </p>

            <button
            onClick={restartGame}              className="w-full py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition"
            >
              Play Again
            </button>

          </div>

        </div>
      )}

      <GameHeader
        roomCode={game.roomCode}
        currentTurn={
          game.players[game.currentTurn]?.username ??
          "Waiting..."
        }
      />

      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          {game.players.map((player, index) => (
            <GamePlayerCard
              key={player.userId}
              player={player}
              host={index === 0}
              active={index === game.currentTurn}
            />
          ))}

        </div>

        <div className="flex justify-center">

          <GameBoard
            game={game}
            moveToken={moveToken}
            currentPlayer={game.players[game.currentTurn]}
          />

        </div>

        <div className="mt-8 flex justify-center">

          <DicePanel
            onRoll={rollDice}
            diceValue={game.diceValue}
          />

        </div>

      </div>

    </div>
  );
}

export default Game;