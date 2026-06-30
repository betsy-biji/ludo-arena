import { Crown } from "lucide-react";

const colors = {
  red: {
    bg: "bg-red-500",
    border: "border-red-500",
  },
  green: {
    bg: "bg-green-500",
    border: "border-green-500",
  },
  blue: {
    bg: "bg-blue-500",
    border: "border-blue-500",
  },
  yellow: {
    bg: "bg-yellow-400",
    border: "border-yellow-400",
  },
};

function GamePlayerCard({
  player,
  active = false,
  host = false,
}) {
  const color =
    colors[player?.color?.toLowerCase()] ??
    {
      bg: "bg-slate-500",
      border: "border-slate-600",
    };

  return (
    <div
      className={`
        rounded-2xl
        border-2
        ${color.border}
        bg-slate-900
        p-4
        transition-all
        duration-300
        ${
          active
            ? "scale-105 shadow-xl shadow-cyan-500/20"
            : ""
        }
      `}
    >
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div
            className={`
              w-12
              h-12
              rounded-full
              ${color.bg}
              flex
              items-center
              justify-center
              font-bold
              text-black
            `}
          >
            {player?.username?.charAt(0)?.toUpperCase() ?? "?"}
          </div>

          <div>

            <h3 className="font-bold text-white">
              {player?.username ?? "Waiting..."}
            </h3>

            <p className="text-sm text-slate-400 capitalize">
              {player?.color ?? "No Color"}
            </p>

          </div>

        </div>

        {host && (
          <Crown
            className="text-yellow-400"
            size={22}
          />
        )}

      </div>
    </div>
  );
}

export default GamePlayerCard;