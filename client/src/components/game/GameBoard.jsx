import BoardCell from "./BoardCell";
import { createBoardLayout } from "./boardLayout";
import { getPath } from "./tokenPaths";

const HOME_POSITIONS = {
  red: [
    { row: 1, col: 1 },
    { row: 1, col: 4 },
    { row: 4, col: 1 },
    { row: 4, col: 4 },
  ],

  green: [
    { row: 1, col: 10 },
    { row: 1, col: 13 },
    { row: 4, col: 10 },
    { row: 4, col: 13 },
  ],

  yellow: [
    { row: 10, col: 10 },
    { row: 10, col: 13 },
    { row: 13, col: 10 },
    { row: 13, col: 13 },
  ],

  blue: [
    { row: 10, col: 1 },
    { row: 10, col: 4 },
    { row: 13, col: 1 },
    { row: 13, col: 4 },
  ],
};

function GameBoard({
  game,
  moveToken,
  currentPlayer,
}) {
  const board = createBoardLayout();

  if (game?.tokens) {
    Object.entries(game.tokens).forEach(([color, tokens]) => {
      const path = getPath(color);

      tokens.forEach((token) => {

        if (token.isHome) {
          const home =
            HOME_POSITIONS[color][token.tokenNumber];

          board[home.row][home.col].tokens.push(token);
          return;
        }

        const position = Math.min(
          token.position,
          path.length - 1
        );

        const coordinate = path[position];

        if (!coordinate) return;

        board[coordinate.row][coordinate.col].tokens.push(
          token
        );
      });
    });
  }

  return (

    <div className="flex justify-center">

      <div
        className="
          p-5
          rounded-3xl

          bg-gradient-to-br
          from-slate-100
          via-white
          to-slate-200

          shadow-[0_20px_60px_rgba(0,0,0,0.35)]

          border-4
          border-white
        "
      >

        <div
          className="
            grid
            gap-[2px]

            rounded-2xl
            overflow-hidden

            bg-slate-300

            shadow-inner
          "
          style={{
            gridTemplateColumns:
              "repeat(15,34px)",
          }}
        >

          {board.flat().map((cell) => (

            <BoardCell
              key={cell.id}
              cell={cell}
              currentPlayer={currentPlayer}
              diceValue={game?.diceValue}
              moveToken={moveToken}
            />

          ))}

        </div>

      </div>

    </div>

  );
}

export default GameBoard;