/*
    Temporary movement paths for the current board.

    These paths match the cross-shaped board that already exists.

    Once gameplay is complete we can replace these
    with the official 52-cell Ludo paths.
*/

const CROSS_PATH = [
  { row: 6, col: 1 },
  { row: 6, col: 2 },
  { row: 6, col: 3 },
  { row: 6, col: 4 },
  { row: 6, col: 5 },

  { row: 6, col: 6 },

  { row: 5, col: 6 },
  { row: 4, col: 6 },
  { row: 3, col: 6 },
  { row: 2, col: 6 },
  { row: 1, col: 6 },
  { row: 0, col: 6 },

  { row: 0, col: 8 },
  { row: 1, col: 8 },
  { row: 2, col: 8 },
  { row: 3, col: 8 },
  { row: 4, col: 8 },
  { row: 5, col: 8 },

  { row: 6, col: 8 },
  { row: 6, col: 9 },
  { row: 6, col: 10 },
  { row: 6, col: 11 },
  { row: 6, col: 12 },
  { row: 6, col: 13 },
  { row: 6, col: 14 },

  { row: 8, col: 14 },
  { row: 8, col: 13 },
  { row: 8, col: 12 },
  { row: 8, col: 11 },
  { row: 8, col: 10 },
  { row: 8, col: 9 },

  { row: 8, col: 8 },

  { row: 9, col: 8 },
  { row: 10, col: 8 },
  { row: 11, col: 8 },
  { row: 12, col: 8 },
  { row: 13, col: 8 },
  { row: 14, col: 8 },

  { row: 14, col: 6 },
  { row: 13, col: 6 },
  { row: 12, col: 6 },
  { row: 11, col: 6 },
  { row: 10, col: 6 },
  { row: 9, col: 6 },

  { row: 8, col: 6 },
  { row: 8, col: 5 },
  { row: 8, col: 4 },
  { row: 8, col: 3 },
  { row: 8, col: 2 },
  { row: 8, col: 1 },
  { row: 8, col: 0 },
];

function rotate(path, start) {
  return [
    ...path.slice(start),
    ...path.slice(0, start),
  ];
}

export const RED_PATH = rotate(CROSS_PATH, 0);

export const GREEN_PATH = rotate(CROSS_PATH, 13);

export const YELLOW_PATH = rotate(CROSS_PATH, 26);

export const BLUE_PATH = rotate(CROSS_PATH, 39);

export function getPath(color) {
  switch (color) {
    case "red":
      return RED_PATH;

    case "green":
      return GREEN_PATH;

    case "yellow":
      return YELLOW_PATH;

    case "blue":
      return BLUE_PATH;

    default:
      return [];
  }
}