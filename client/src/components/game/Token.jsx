function Token({
  token,
  isMyTurn,
  diceValue,
  onMove,
}) {
  const colors = {
    red: {
      light: "#ef4444",
      dark: "#b91c1c",
      glow: "rgba(239,68,68,0.6)",
    },

    green: {
      light: "#22c55e",
      dark: "#15803d",
      glow: "rgba(34,197,94,0.6)",
    },

    blue: {
      light: "#3b82f6",
      dark: "#1d4ed8",
      glow: "rgba(59,130,246,0.6)",
    },

    yellow: {
      light: "#facc15",
      dark: "#ca8a04",
      glow: "rgba(250,204,21,0.6)",
    },
  };

  const color =
    colors[token.color] || colors.red;

  const clickable =
    isMyTurn && diceValue !== null;

  return (
    <button
      onClick={() => {
        if (clickable) {
          onMove(token.tokenNumber);
        }
      }}
      disabled={!clickable}
      title={`${token.color} Token ${token.tokenNumber + 1}`}
      style={{
        background: `radial-gradient(circle at 30% 30%, ${color.light}, ${color.dark})`,
        boxShadow: clickable
          ? `0 0 12px ${color.glow},
             inset 0 2px 3px rgba(255,255,255,.45),
             inset 0 -3px 4px rgba(0,0,0,.25),
             0 3px 8px rgba(0,0,0,.35)`
          : `inset 0 2px 3px rgba(255,255,255,.45),
             inset 0 -3px 4px rgba(0,0,0,.25),
             0 3px 8px rgba(0,0,0,.35)`,
      }}
      className={`
        w-5
        h-5
        rounded-full

        border-2
        border-white

        transition-all
        duration-200

        ${
          clickable
            ? "hover:scale-125 hover:-translate-y-1 cursor-pointer"
            : "cursor-default opacity-95"
        }
      `}
    >
      <div
        className="
          w-2
          h-2
          rounded-full
          bg-white/40
          ml-1
          mt-1
        "
      />
    </button>
  );
}

export default Token;