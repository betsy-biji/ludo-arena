import {
  Crown,
  Users,
  Gamepad2,
  Activity,
  Clock,
} from "lucide-react";

function MatchInfo({
  room,
  isHost,
}) {
  const minimumPlayers = 2;
  const maximumPlayers = 4;

  const canStart =
    room.players.length >= minimumPlayers;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 h-full flex flex-col">

      <h2 className="text-2xl font-bold text-white mb-8">
        Match Details
      </h2>

      <div className="space-y-5">

        <div className="flex items-center justify-between bg-slate-800 rounded-2xl p-4">

          <div className="flex items-center gap-3">

            <Users
              size={22}
              className="text-indigo-400"
            />

            <span className="text-slate-300">
              Players
            </span>

          </div>

          <span className="font-bold text-lg">
            {room.players.length}/{maximumPlayers}
          </span>

        </div>

        <div className="flex items-center justify-between bg-slate-800 rounded-2xl p-4">

          <div className="flex items-center gap-3">

            <Gamepad2
              size={22}
              className="text-green-400"
            />

            <span className="text-slate-300">
              Game Mode
            </span>

          </div>

          <span className="font-semibold">
            Classic
          </span>

        </div>

        <div className="flex items-center justify-between bg-slate-800 rounded-2xl p-4">

          <div className="flex items-center gap-3">

            <Activity
              size={22}
              className="text-yellow-400"
            />

            <span className="text-slate-300">
              Status
            </span>

          </div>

          <span
            className={`font-semibold ${
              canStart
                ? "text-green-400"
                : "text-yellow-400"
            }`}
          >
            {canStart
              ? "Ready to Start"
              : "Waiting"}
          </span>

        </div>

        <div className="flex items-center justify-between bg-slate-800 rounded-2xl p-4">

          <div className="flex items-center gap-3">

            <Crown
              size={22}
              className="text-orange-400"
            />

            <span className="text-slate-300">
              Host
            </span>

          </div>

          <span className="font-semibold">
            {room.players.length
              ? room.players[0].username
              : "--"}
          </span>

        </div>

        <div className="flex items-center justify-between bg-slate-800 rounded-2xl p-4">

          <div className="flex items-center gap-3">

            <Clock
              size={22}
              className="text-cyan-400"
            />

            <span className="text-slate-300">
              Minimum Players
            </span>

          </div>

          <span className="font-semibold">
            {minimumPlayers}
          </span>

        </div>

      </div>

      <div className="mt-8 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-5">

        <h3 className="text-lg font-bold mb-2">
          Match Rules
        </h3>

        <ul className="text-sm text-slate-100 space-y-2">

          <li>• Minimum 2 players required.</li>

          <li>• Maximum 4 players.</li>

          <li>• Host controls match start.</li>

          <li>• Real-time multiplayer gameplay.</li>

        </ul>

      </div>

      <div className="mt-auto pt-8">

        {isHost ? (

          <div className="rounded-xl bg-indigo-600/20 border border-indigo-500 p-4">

            <p className="text-indigo-300 font-semibold">
              You are the Host
            </p>

            <p className="text-sm text-slate-400 mt-1">
              You can start the match once at least two players have joined.
            </p>

          </div>

        ) : (

          <div className="rounded-xl bg-slate-800 p-4">

            <p className="text-slate-300 font-semibold">
              Waiting for Host
            </p>

            <p className="text-sm text-slate-400 mt-1">
              The host will start the game when everyone is ready.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default MatchInfo;