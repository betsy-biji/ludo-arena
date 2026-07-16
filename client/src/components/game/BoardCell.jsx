import Token from "./Token";
import { CELL_TYPES } from "./boardLayout";

function getHomeColor(color) {
  switch (color) {
    case "red":
      return "bg-red-300";

    case "green":
      return "bg-green-300";

    case "yellow":
      return "bg-yellow-300";

    case "blue":
      return "bg-blue-300";

    default:
      return "bg-slate-100";
  }
}

function BoardCell({
  cell,
  currentPlayer,
  diceValue,
  moveToken,
}) {
  let background = "bg-slate-100";
  let border = "border-slate-300";

  switch (cell.type) {
    case CELL_TYPES.HOME:
background = `${getHomeColor(cell.color)} shadow-inner`;      border = "border-white";
      break;

    case CELL_TYPES.PATH:
      background = "bg-white";
      break;

    case CELL_TYPES.SAFE:
      background =
        "bg-gradient-to-br from-emerald-400 to-green-600";
      border = "border-green-700";
      break;

    case CELL_TYPES.CENTER:
    background =
      "bg-gradient-to-br from-red-500 via-yellow-400 to-green-500";
    border = "border-yellow-600";
    break;
    
    default:
      background = "bg-slate-100";
  }

  return (
    <div
      className={`
        relative
        w-[34px]
        h-[34px]
        border
        ${border}
        overflow-hidden
        flex
        items-center
        justify-center
        transition-all
        duration-200
      `}
    >
      {/* Background */}

      <div
        className={`
          absolute
          inset-0
          ${background}
        `}
      />

      {/* Safe Cell */}

      {cell.type === CELL_TYPES.SAFE && (
        <span
          className="
            absolute
            text-white
            text-xs
            z-10
            select-none
          "
        >
          ★
        </span>
      )}

      {/* Center */}

{cell.type === CELL_TYPES.CENTER && (
  <span
    className="
      absolute
      text-white
      font-bold
      text-lg
      z-10
      select-none
      drop-shadow-md
    "
  >
    ★
  </span>
)}
      {/* Tokens */}

      <div
  className={`
    relative
    z-20
    flex
    flex-wrap
    items-center
    justify-center

    ${
      cell.type === CELL_TYPES.HOME
        ? "w-7 h-7 rounded-full bg-white/90 border-2 border-white shadow-lg"
        : "w-full h-full p-[2px] gap-[2px]"
    }
  `}
>
        {cell.tokens.map((token) => (
          <Token
            key={`${token.color}-${token.tokenNumber}`}
            token={token}
            isMyTurn={
              currentPlayer &&
              token.color ===
                currentPlayer.color.toLowerCase()
            }
            diceValue={diceValue}
            onMove={moveToken}
          />
        ))}
      </div>
    </div>
  );
}

export default BoardCell;