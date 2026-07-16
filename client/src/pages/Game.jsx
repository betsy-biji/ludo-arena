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
  <div
    className="
      fixed
      inset-0
      bg-black/75
      backdrop-blur-md
      flex
      items-center
      justify-center
      z-50
      animate-fadeIn
    "
  >
    <div
      className="
        w-[470px]
        rounded-[32px]
        overflow-hidden

        bg-gradient-to-br
        from-slate-900
        via-slate-800
        to-slate-950

        border
        border-yellow-400/40

        shadow-[0_0_60px_rgba(255,215,0,.18)]

        p-10

        text-center
      "
    >
      {/* Trophy */}

      <div className="text-8xl mb-4 animate-bounce">
        🏆
      </div>

      {/* Title */}

      <h1
        className="
          text-4xl
          font-black
          tracking-wide
          text-yellow-400
        "
      >
        VICTORY
      </h1>

      <p
        className="
          mt-2
          text-slate-300
          text-lg
        "
      >
        Congratulations
      </p>

      {/* Winner */}

      <div
        className="
          mt-8

          rounded-2xl

          bg-slate-800/60

          border

          border-slate-700

          py-6
        "
      >
        <div className="text-6xl mb-3">
          👑
        </div>

        <h2
          className="
            text-3xl
            font-extrabold
            text-white
          "
        >
          {winner.winner}
        </h2>

        <p
          className="
            mt-2
            text-yellow-300
            font-semibold
          "
        >
          is the Winner!
        </p>
      </div>

      {/* Buttons */}

      <div className="mt-10 flex gap-4">

        <button
          onClick={restartGame}
          className="
            flex-1

            py-4

            rounded-2xl

            bg-gradient-to-r
            from-green-500
            to-emerald-600

            hover:scale-105
            transition

            text-white
            font-bold
            text-lg

            shadow-lg
          "
        >
          🔄 Play Again
        </button>

        <button
          onClick={() => window.location.href = "/lobby"}
          className="
            flex-1

            py-4

            rounded-2xl

            bg-slate-700

            hover:bg-slate-600
            transition

            text-white
            font-bold
            text-lg
          "
        >
          🚪 Lobby
        </button>

      </div>

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