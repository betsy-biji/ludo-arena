function Token({
  token,
  isMyTurn,
  diceValue,
  onMove,
}) {
  const colors = {
    red: "#dc2626",
    green: "#16a34a",
    blue: "#2563eb",
    yellow: "#eab308",
  };

  const clickable =
    isMyTurn &&
    diceValue !== null;

  return (
    <button
      onClick={() => {
        if (clickable) {
          onMove(token.tokenNumber);
        }
      }}
      disabled={!clickable}
      style={{
        backgroundColor:
          colors[token.color] || "#6b7280",
      }}
      className={`
        w-3.5
        h-3.5
        rounded-full
        border
        border-white
        shadow
        transition-all
        duration-200
        ${
          clickable
            ? "hover:scale-125 cursor-pointer"
            : ""
        }
      `}
      title={`${token.color} ${token.tokenNumber + 1}`}
    />
  );
}

export default Token;