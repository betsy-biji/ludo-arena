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

        // HOME TOKEN
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
    <div
      className="bg-white rounded-2xl shadow-2xl p-2"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(15,32px)",
      }}
    >
      {board.flat().map((cell) => (
        <BoardCell
          key={cell.id}
          cell={cell}
          isMyTurn={true}
          currentPlayer={currentPlayer}
          diceValue={game?.diceValue}
          moveToken={moveToken}
        />
      ))}
    </div>
  );
}

export default GameBoard;