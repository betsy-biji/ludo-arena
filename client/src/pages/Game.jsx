import GameHeader from "../components/game/GameHeader";
import GamePlayerCard from "../components/game/GamePlayerCard";
import GameBoard from "../components/game/GameBoard";
import DicePanel from "../components/game/DicePanel";

import useGameSocket from "../hooks/useGameSocket";

function Game() {
  const { game, loading, rollDice } = useGameSocket();

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

      <GameHeader
        roomCode={game.roomCode}
        currentTurn={
          game.players[game.currentTurn]?.username ??
          "Waiting..."
        }
      />

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Players */}

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

        {/* Board */}

        <div className="flex justify-center">

          <GameBoard />

        </div>

        {/* Dice */}

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