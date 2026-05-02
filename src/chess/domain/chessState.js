import { PIECES } from './chessConstants'

export function createSquare(id, piece = PIECES.EMPTY, pieceColor = '') {
  return {
    id,
    squareColor: id % 2 === 1,
    piece,
    pieceColor,
  }
}

export function createEmptySquare(id = 0) {
  return createSquare(id, PIECES.EMPTY, '')
}

export function createSelectedPiece(square = createEmptySquare(), isSelected = false) {
  return {
    isSelected,
    square,
  }
}

export function cloneSquare(square) {
  return {
    id: square.id,
    squareColor: square.squareColor,
    piece: square.piece,
    pieceColor: square.pieceColor,
  }
}

export function cloneSquares(squares) {
  return squares.map(cloneSquare)
}

function createInitialSquares() {
  const majorPieces = [
    PIECES.ROOK,
    PIECES.KNIGHT,
    PIECES.BISHOP,
    PIECES.QUEEN,
    PIECES.KING,
    PIECES.BISHOP,
    PIECES.KNIGHT,
    PIECES.ROOK,
  ]

  return Array.from({ length: 64 }, (_, index) => {
    const id = index + 1

    if (id <= 8) {
      return createSquare(id, majorPieces[index], false)
    }

    else if (id <= 16) {
      return createSquare(id, PIECES.PAWN, false)
    }

    else if (id >= 49 && id <= 56) {
      return createSquare(id, PIECES.PAWN, true)
    }

    else if (id >= 57) {
      return createSquare(id, majorPieces[id - 57], true)
    }

    return createSquare(id)
  })
}

export function createInitialGameState() {
  return {
    squares: createInitialSquares(),
    moves: [],
    selectedPiece: createSelectedPiece(),
    turn: true,
    enpassent: 0,
    castling: [true, true, true, true],
    checkmate: false,
    stalemate: false,
    draw: false,
    move50: 0,
    history: [],
    promoting: false,
    promoteSavedSquare: createEmptySquare(),
    wcheck: 0,
    bcheck: 0,
    lastmove: 0,
  }
}
