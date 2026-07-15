import Token from "./Token";
import { CELL_TYPES } from "./boardLayout";

function BoardCell({
  cell,
  isMyTurn,
  currentPlayer,
  diceValue,
  moveToken,
}) {
  let bg = "bg-slate-100";

  switch (cell.type) {
    case CELL_TYPES.HOME:
      bg = `bg-${cell.color}-200`;
      break;

    case CELL_TYPES.PATH:
      bg = "bg-white";
      break;

    case CELL_TYPES.SAFE:
      bg = "bg-green-400";
      break;

    case CELL_TYPES.CENTER:
      bg =
        "bg-gradient-to-br from-red-400 via-yellow-300 to-green-400";
      break;

    default:
      bg = "bg-slate-100";
  }

  return (
    <div
      className="
      w-8
      h-8
      border
      border-slate-400
      relative
      flex
      items-center
      justify-center
      overflow-hidden
      "
    >
      {/* Background */}

      <div
        className={`
          absolute
          inset-0
          ${bg}
        `}
      />

      {/* Coordinates (remove later) */}

      <span
        className="
        absolute
        top-0
        left-0
        text-[7px]
        font-bold
        z-10
        text-black
        "
      >
        {cell.row},{cell.col}
      </span>

      {/* Tokens */}

      <div
        className="
        relative
        z-20
        flex
        flex-wrap
        items-center
        justify-center
        gap-[1px]
        w-full
        h-full
        p-[2px]
        "
      >
        {cell.tokens.map((token) => (
  <Token
    key={`${token.color}-${token.tokenNumber}`}
    token={token}
    isMyTurn={
      currentPlayer &&
      token.color === currentPlayer.color.toLowerCase()
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