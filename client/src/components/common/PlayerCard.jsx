import { Crown, Circle } from "lucide-react";

const colorMap = {
  red: {
    bg: "bg-red-500",
    text: "text-red-400",
    border: "border-red-500/40",
  },
  green: {
    bg: "bg-green-500",
    text: "text-green-400",
    border: "border-green-500/40",
  },
  blue: {
    bg: "bg-blue-500",
    text: "text-blue-400",
    border: "border-blue-500/40",
  },
  yellow: {
    bg: "bg-yellow-400",
    text: "text-yellow-300",
    border: "border-yellow-400/40",
  },
};

function PlayerCard({
  player,
  isHost,
}) {
  const color =
    colorMap[player.color?.toLowerCase()] ||
    {
      bg: "bg-slate-500",
      text: "text-slate-300",
      border: "border-slate-600",
    };

  return (
    <div
      className={`bg-slate-900 border ${color.border} rounded-2xl p-5 transition-all duration-300 hover:border-indigo-500 hover:-translate-y-1`}
    >
      <div className="flex justify-between items-start">

        <div className="flex items-center gap-4">

          <div
            className={`w-14 h-14 rounded-full ${color.bg} flex items-center justify-center text-black font-black text-xl`}
          >
            {player.username.charAt(0).toUpperCase()}
          </div>

          <div>

            <h3 className="text-xl font-bold text-white">
              {player.username}
            </h3>

            <div className="flex items-center gap-2 mt-2">

              <Circle
                size={10}
                fill="currentColor"
                className="text-green-400"
              />

              <span className="text-sm text-green-400">
                Connected
              </span>

            </div>

          </div>

        </div>

        {isHost && (
          <div className="flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 rounded-full px-3 py-1">

            <Crown
              size={16}
              className="text-amber-400"
            />

            <span className="text-sm font-semibold text-amber-300">
              HOST
            </span>

          </div>
        )}

      </div>

      <div className="mt-6 flex justify-between items-center">

        <div>

          <p className="text-xs uppercase tracking-wider text-slate-500">
            Token Color
          </p>

          <div className="flex items-center gap-2 mt-2">

            <div
              className={`w-4 h-4 rounded-full ${color.bg}`}
            />

            <span className={`${color.text} font-semibold capitalize`}>
              {player.color}
            </span>

          </div>

        </div>

        <div className="text-right">

          <p className="text-xs uppercase tracking-wider text-slate-500">
            Status
          </p>

          <p className="text-green-400 font-semibold mt-2">
            Ready
          </p>

        </div>

      </div>
    </div>
  );
}

export default PlayerCard;