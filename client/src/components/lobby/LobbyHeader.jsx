import { Copy, LogOut, Users, Wifi } from "lucide-react";

function LobbyHeader({
  roomCode,
  playerCount,
  onCopy,
  onLeave,
}) {
  return (
    <header className="w-full border-b border-slate-800 bg-slate-900/70 backdrop-blur-xl">

      <div className="max-w-7xl mx-auto h-24 px-8 flex items-center justify-between">

        {/* Left */}

        <div className="flex flex-col">

          <h1 className="text-4xl font-black tracking-wide text-white">
            LUDO ARENA
          </h1>

          <p className="text-slate-400 text-sm mt-1">
            Multiplayer Classic Lobby
          </p>

        </div>

        {/* Center */}

        <div className="hidden lg:flex items-center gap-10">

          <div className="flex items-center gap-3">

            <Users size={20} className="text-indigo-400" />

            <div>

              <p className="text-xs uppercase tracking-widest text-slate-500">
                Players
              </p>

              <p className="text-lg font-semibold text-white">
                {playerCount}/4
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <Wifi
              size={20}
              className="text-green-400"
            />

            <div>

              <p className="text-xs uppercase tracking-widest text-slate-500">
                Server
              </p>

              <p className="text-lg font-semibold text-green-400">
                Online
              </p>

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

          <div className="text-right">

            <p className="text-xs uppercase tracking-widest text-slate-500">
              Room Code
            </p>

            <h2 className="text-2xl font-black tracking-[0.25em] text-indigo-400">
              {roomCode}
            </h2>

          </div>

          <button
            onClick={onCopy}
            className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-indigo-600 transition flex items-center justify-center"
            title="Copy Room Code"
          >
            <Copy size={20} />
          </button>

          <button
            onClick={onLeave}
            className="w-12 h-12 rounded-xl bg-red-600 hover:bg-red-500 transition flex items-center justify-center"
            title="Leave Lobby"
          >
            <LogOut size={20} />
          </button>

        </div>

      </div>

    </header>
  );
}

export default LobbyHeader;