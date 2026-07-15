export const BOARD_SIZE = 15;

export const CELL_TYPES = {
  EMPTY: "EMPTY",
  PATH: "PATH",
  SAFE: "SAFE",
  HOME: "HOME",
  CENTER: "CENTER",
};

export function createBoardLayout() {
  const board = [];

  for (let row = 0; row < BOARD_SIZE; row++) {
    const currentRow = [];

    for (let col = 0; col < BOARD_SIZE; col++) {
      currentRow.push({
        id: `${row}-${col}`,
        row,
        col,
        type: CELL_TYPES.EMPTY,
        color: null,
        tokens: [],
      });
    }

    board.push(currentRow);
  }

  /* ---------- RED HOME ---------- */

  for (let r = 0; r <= 5; r++) {
    for (let c = 0; c <= 5; c++) {
      board[r][c].type = CELL_TYPES.HOME;
      board[r][c].color = "red";
    }
  }

  /* ---------- GREEN HOME ---------- */

  for (let r = 0; r <= 5; r++) {
    for (let c = 9; c <= 14; c++) {
      board[r][c].type = CELL_TYPES.HOME;
      board[r][c].color = "green";
    }
  }

  /* ---------- BLUE HOME ---------- */

  for (let r = 9; r <= 14; r++) {
    for (let c = 0; c <= 5; c++) {
      board[r][c].type = CELL_TYPES.HOME;
      board[r][c].color = "blue";
    }
  }

  /* ---------- YELLOW HOME ---------- */

  for (let r = 9; r <= 14; r++) {
    for (let c = 9; c <= 14; c++) {
      board[r][c].type = CELL_TYPES.HOME;
      board[r][c].color = "yellow";
    }
  }

  /* ---------- CENTER ---------- */

  for (let r = 6; r <= 8; r++) {
    for (let c = 6; c <= 8; c++) {
      board[r][c].type = CELL_TYPES.CENTER;
    }
  }

  /* ---------- HORIZONTAL PATH ---------- */

  for (let c = 0; c < 15; c++) {
    if (c < 6 || c > 8) {
      board[6][c].type = CELL_TYPES.PATH;
      board[8][c].type = CELL_TYPES.PATH;
    }
  }

  /* ---------- VERTICAL PATH ---------- */

  for (let r = 0; r < 15; r++) {
    if (r < 6 || r > 8) {
      board[r][6].type = CELL_TYPES.PATH;
      board[r][8].type = CELL_TYPES.PATH;
    }
  }

  /* ---------- MIDDLE CROSS ---------- */

  board[7][6].type = CELL_TYPES.PATH;
  board[7][8].type = CELL_TYPES.PATH;
  board[6][7].type = CELL_TYPES.PATH;
  board[8][7].type = CELL_TYPES.PATH;

  /* ---------- SAFE CELLS ---------- */

  const safeCells = [
    [6, 1],
    [1, 8],
    [8, 13],
    [13, 6],
    [2, 6],
    [6, 12],
    [12, 8],
    [8, 2],
  ];

  safeCells.forEach(([r, c]) => {
    board[r][c].type = CELL_TYPES.SAFE;
  });

  return board;
}