import { Trophy, Users } from "lucide-react";

function GameHeader({
  roomCode = "------",
  currentTurn = "Waiting...",
}) {
  return (
    <header className="bg-slate-900 border-b border-slate-800 shadow-lg">

      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Left */}

        <div>

          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Trophy className="text-yellow-400" size={32} />
            Ludo Arena
          </h1>

          <p className="text-slate-400 mt-1">
            Real-Time Multiplayer
          </p>

        </div>

        {/* Center */}

        <div className="bg-slate-800 rounded-xl px-6 py-3 border border-slate-700">

          <p className="text-xs uppercase text-slate-500 tracking-wider">
            Room Code
          </p>

          <h2 className="text-2xl font-black tracking-[0.3em] text-cyan-400">
            {roomCode}
          </h2>

        </div>

        {/* Right */}

        <div className="text-right">

          <div className="flex items-center justify-end gap-2 text-slate-300">

            <Users size={18} />

            <span className="font-semibold">
              Current Turn
            </span>

          </div>

          <h2 className="text-xl font-bold text-green-400 mt-2">
            {currentTurn}
          </h2>

        </div>

      </div>

    </header>
  );
}

export default GameHeader;