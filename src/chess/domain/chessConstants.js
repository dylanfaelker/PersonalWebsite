export const PIECES = {
  EMPTY: 0,
  PAWN: 1,
  BISHOP: 2,
  KNIGHT: 3,
  ROOK: 4,
  QUEEN: 5,
  KING: 6,
}

export const PROMOTION_PIECES = [
  { value: PIECES.QUEEN, label: 'Queen' },
  { value: PIECES.ROOK, label: 'Rook' },
  { value: PIECES.KNIGHT, label: 'Knight' },
  { value: PIECES.BISHOP, label: 'Bishop' },
]
