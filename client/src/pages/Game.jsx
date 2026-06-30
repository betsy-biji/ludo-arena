import GameHeader from "../components/game/GameHeader";
import GamePlayerCard from "../components/game/GamePlayerCard";
import Board from "../components/game/GameBoard";
import Dice from "../components/game/DicePanel";

function Game() {
  const players = [
    {
      username: "Player 1",
      color: "red",
    },
    {
      username: "Player 2",
      color: "green",
    },
    {
      username: "Player 3",
      color: "yellow",
    },
    {
      username: "Player 4",
      color: "blue",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">

      {/* Header */}
      <GameHeader />

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Player Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          {players.map((player, index) => (
            <GamePlayerCard
              key={index}
              player={player}
              host={index === 0}
              active={index === 0}
            />
          ))}

        </div>

        {/* Board */}
        <div className="flex justify-center">

          <Board />

        </div>

        {/* Dice */}
        <div className="mt-8 flex justify-center">

          <Dice />

        </div>

      </div>

    </div>
  );
}

export default Game;