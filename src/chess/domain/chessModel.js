import { PIECES } from './chessConstants'
import {
  cloneSquare,
  cloneSquares,
  createEmptySquare,
  createSelectedPiece,
} from './chessState'

export function getStatusText(gameState) {
  if (gameState.draw) {
    return 'DRAW'
  }

  if (gameState.checkmate) {
    return 'CHECKMATE!'
  }

  if (gameState.stalemate) {
    return 'STALEMATE'
  }

  return gameState.turn ? "WHITE'S TURN" : "BLACK'S TURN"
}

export function selectSquare(gameState, squareId) {
  const square = getSquare(squareId, gameState.squares)

  if (!square) {
    return gameState
  }

  if (gameState.promoting) {
    return gameState
  }

  if (gameState.checkmate || gameState.stalemate || gameState.draw) {
    return unselect(gameState)
  }

  if (gameState.selectedPiece.isSelected) {
    return checkMove(gameState, square)
  }

  return pickPiece(gameState, square)
}

export function pickPromotion(gameState, promotionPiece) {
  if (!gameState.promoting) {
    return gameState
  }

  const history = gameState.history.concat([cloneSquares(gameState.squares)])
  const newSquares = pretendPromotion(
    gameState.promoteSavedSquare,
    gameState.selectedPiece.square,
    gameState.squares,
    promotionPiece
  )
  const castling = changeCastle(
    gameState.selectedPiece.square,
    gameState.promoteSavedSquare,
    gameState.castling
  )

  const nextState = {
    ...gameState,
    history,
    squares: newSquares,
    moves: [],
    selectedPiece: createSelectedPiece(),
    turn: !gameState.turn,
    enpassent: 0,
    castling,
    move50: 0,
    promoting: false,
    promoteSavedSquare: createEmptySquare(),
  }

  return finalizeResolvedState(nextState, {
    lastMoveId: gameState.promoteSavedSquare.id,
    allowDrawChecks: false,
  })
}

export function applyMoveByIds(gameState, fromId, toId, promotionPiece = null) {
  const fromSquare = getSquare(fromId, gameState.squares)
  const toSquare = getSquare(toId, gameState.squares)

  if (!fromSquare.piece) {
    return gameState
  }

  if (promotionPiece !== null) {
    const history = gameState.history.concat([cloneSquares(gameState.squares)])
    const newSquares = pretendPromotion(toSquare, fromSquare, gameState.squares, promotionPiece)
    const castling = changeCastle(fromSquare, toSquare, gameState.castling)

    return finalizeResolvedState(
      {
        ...gameState,
        history,
        squares: newSquares,
        moves: [],
        selectedPiece: createSelectedPiece(),
        turn: !gameState.turn,
        enpassent: 0,
        castling,
        move50: 0,
        promoting: false,
        promoteSavedSquare: createEmptySquare(),
      },
      {
        lastMoveId: toId,
        allowDrawChecks: false,
      }
    )
  }

  const selectedState = {
    ...gameState,
    selectedPiece: createSelectedPiece(cloneSquare(fromSquare), true),
  }

  return makeMove(selectedState, toSquare)
}

export function resolveGameState(gameState) {
  return finalizeResolvedState(
    {
      ...gameState,
      checkmate: false,
      stalemate: false,
      draw: false,
    },
    {
      lastMoveId: gameState.lastmove,
      allowDrawChecks: true,
    }
  )
}

function pickPiece(gameState, square) {
  return square.piece && square.pieceColor === gameState.turn ? selectPiece(gameState, square) : unselect(gameState)
}

function checkMove(gameState, square) {
  return gameState.moves.includes(square.id) ? makeMove(gameState, square) : unselectMaybe(gameState, square)
}

function selectPiece(gameState, square) {
  return {
    ...gameState,
    moves: findMoves(square, gameState.squares, gameState.castling, gameState.enpassent),
    selectedPiece: createSelectedPiece(cloneSquare(square), true),
  }
}

function unselectMaybe(gameState, square) {
  return square.piece && square.pieceColor === gameState.turn ? selectPiece(gameState, square) : unselect(gameState)
}

function unselect(gameState) {
  return {
    ...gameState,
    moves: [],
    selectedPiece: createSelectedPiece(),
  }
}

function makeMove(gameState, square) {
  const selectedSquare = gameState.selectedPiece.square

  if (willPromoteAfterMove(selectedSquare)) {
    return {
      ...gameState,
      promoting: true,
      promoteSavedSquare: cloneSquare(square),
    }
  }

  const history = gameState.history.concat([cloneSquares(gameState.squares)])
  const newSquares = applyMoveToSquares(selectedSquare, square, gameState.squares, gameState.enpassent)
  const newEnpassent =
    Math.abs(square.id - selectedSquare.id) === 16 && selectedSquare.piece === PIECES.PAWN ? square.id : 0
  const newCastling = isCastle(square, selectedSquare)
    ? selectedSquare.pieceColor
      ? [false, false, gameState.castling[2], gameState.castling[3]]
      : [gameState.castling[0], gameState.castling[1], false, false]
    : changeCastle(selectedSquare, square, gameState.castling)
  const newMove50 =
    square.piece !== PIECES.EMPTY || selectedSquare.piece === PIECES.PAWN
      ? 0
      : gameState.move50 + 0.5

  const nextState = {
    ...gameState,
    history,
    squares: newSquares,
    moves: [],
    selectedPiece: createSelectedPiece(),
    turn: !gameState.turn,
    enpassent: newEnpassent,
    castling: newCastling,
    move50: newMove50,
  }

  return finalizeResolvedState(nextState, {
    lastMoveId: square.id,
    allowDrawChecks: true,
  })
}

function finalizeResolvedState(gameState, { lastMoveId, allowDrawChecks }) {
  const wcheck = findCheck(true, gameState.squares, gameState.castling, gameState.enpassent)
  const bcheck = findCheck(false, gameState.squares, gameState.castling, gameState.enpassent)
  const resolvedState = {
    ...gameState,
    lastmove: lastMoveId,
    wcheck,
    bcheck,
    checkmate: false,
    stalemate: false,
    draw: false,
  }

  if (isOver(resolvedState.squares, resolvedState.turn, resolvedState.castling, resolvedState.enpassent)) {
    if (inCheck(resolvedState.squares, resolvedState.turn, resolvedState.castling, resolvedState.enpassent)) {
      return { ...resolvedState, checkmate: true }
    }

    return { ...resolvedState, stalemate: true }
  }

  if (
    allowDrawChecks &&
    (resolvedState.move50 === 50 || numAppears(resolvedState.squares, resolvedState.history) >= 2)
  ) {
    return { ...resolvedState, draw: true }
  }

  return resolvedState
}

function findCheck(turn, squares, castling, enpassent) {
  const kingSquare = squares.find((square) => square.piece === PIECES.KING && square.pieceColor === turn)
  if (!kingSquare) {
    return 0
  }

  return inCheck(squares, turn, castling, enpassent) ? kingSquare.id : 0
}

function numAppears(squares, history) {
  let count = 0

  for (const squaresCheck of history) {
    if (compareBoards(squares, squaresCheck)) {
      count += 1
    }
  }

  return count
}

function compareBoards(squares1, squares2) {
  for (const square of squares1) {
    if (!inSquares(square, squares2)) {
      return false
    }
  }

  return true
}

function inSquares(square, squares) {
  for (const squareCheck of squares) {
    if (
      square.id === squareCheck.id &&
      square.piece === squareCheck.piece &&
      square.pieceColor === squareCheck.pieceColor
    ) {
      return true
    }
  }

  return false
}

function changeCastle(oldSquare, newSquare, castling) {
  if (oldSquare.id === 1) {
    return [castling[0], castling[1], false, castling[3]]
  }

  if (oldSquare.id === 8) {
    return [castling[0], castling[1], castling[2], false]
  }

  if (oldSquare.id === 57) {
    return [false, castling[1], castling[2], castling[3]]
  }

  if (oldSquare.id === 64) {
    return [castling[0], false, castling[2], castling[3]]
  }

  if (newSquare.id === 1) {
    return [castling[0], castling[1], false, castling[3]]
  }

  if (newSquare.id === 8) {
    return [castling[0], castling[1], castling[2], false]
  }

  if (newSquare.id === 57) {
    return [false, castling[1], castling[2], castling[3]]
  }

  if (newSquare.id === 64) {
    return [castling[0], false, castling[2], castling[3]]
  }

  if (oldSquare.piece === PIECES.KING && oldSquare.pieceColor) {
    return [false, false, castling[2], castling[3]]
  }

  if (oldSquare.piece === PIECES.KING && !oldSquare.pieceColor) {
    return [castling[0], castling[1], false, false]
  }

  return castling
}

function isEnpassent(newSquare, oldSquare) {
  if (oldSquare.piece === PIECES.PAWN) {
    if (
      (infinityRight(oldSquare.id - 7) === newSquare.id ||
        infinityRight(oldSquare.id + 9) === newSquare.id ||
        infinityLeft(oldSquare.id + 7) === newSquare.id ||
        infinityLeft(oldSquare.id - 9) === newSquare.id) &&
      newSquare.piece === PIECES.EMPTY
    ) {
      return true
    }
  }

  return false
}

function isCastle(newSquare, oldSquare) {
  if (oldSquare.piece === PIECES.KING) {
    if (
      infinityRight(oldSquare.id - 7) !== newSquare.id &&
      oldSquare.id - 8 !== newSquare.id &&
      infinityLeft(oldSquare.id - 9) !== newSquare.id &&
      infinityRight(oldSquare.id + 1) !== newSquare.id &&
      infinityLeft(oldSquare.id - 1) !== newSquare.id &&
      infinityLeft(oldSquare.id + 7) !== newSquare.id &&
      oldSquare.id + 8 !== newSquare.id &&
      infinityRight(oldSquare.id + 9) !== newSquare.id
    ) {
      return true
    }
  }

  return false
}

function willPromoteAfterMove(oldSquare) {
  const row = Math.ceil(oldSquare.id / 8)
  return (
    oldSquare.piece === PIECES.PAWN &&
    ((oldSquare.pieceColor && row === 2) || (!oldSquare.pieceColor && row === 7))
  )
}

function testMove(newSquare, oldSquare, squares, castling, enpassent, turn) {
  const newSquares = applyMoveToSquares(oldSquare, newSquare, squares, enpassent)
  const newCastling = isCastle(newSquare, oldSquare)
    ? oldSquare.pieceColor
      ? [false, false, castling[2], castling[3]]
      : [castling[0], castling[1], false, false]
    : changeCastle(oldSquare, newSquare, castling)
  const newEnpassent =
    Math.abs(newSquare.id - oldSquare.id) === 16 && oldSquare.piece === PIECES.PAWN ? newSquare.id : 0

  return !inCheckSafe(newSquares, turn, newCastling, newEnpassent)
}

function applyMoveToSquares(oldSquare, newSquare, squares, enpassent) {
  if (isEnpassent(newSquare, oldSquare)) {
    return squares.map((squareCheck) => {
      if (squareCheck.id === newSquare.id) {
        return {
          ...squareCheck,
          piece: oldSquare.piece,
          pieceColor: oldSquare.pieceColor,
        }
      }

      if (squareCheck.id === oldSquare.id || squareCheck.id === enpassent) {
        return {
          ...squareCheck,
          piece: PIECES.EMPTY,
          pieceColor: '',
        }
      }

      return cloneSquare(squareCheck)
    })
  }

  if (isCastle(newSquare, oldSquare)) {
    const { oldRookId, newRookId } = getCastleRookMove(oldSquare, newSquare)
    const oldRook = getSquare(oldRookId, squares)

    return squares.map((squareCheck) => {
      if (squareCheck.id === newSquare.id) {
        return {
          ...squareCheck,
          piece: oldSquare.piece,
          pieceColor: oldSquare.pieceColor,
        }
      }

      if (squareCheck.id === oldSquare.id || squareCheck.id === oldRookId) {
        return {
          ...squareCheck,
          piece: PIECES.EMPTY,
          pieceColor: '',
        }
      }

      if (squareCheck.id === newRookId && oldRook) {
        return {
          ...squareCheck,
          piece: oldRook.piece,
          pieceColor: oldRook.pieceColor,
        }
      }

      return cloneSquare(squareCheck)
    })
  }

  return squares.map((squareCheck) => {
    if (squareCheck.id === newSquare.id) {
      return {
        ...squareCheck,
        piece: oldSquare.piece,
        pieceColor: oldSquare.pieceColor,
      }
    }

    if (squareCheck.id === oldSquare.id) {
      return {
        ...squareCheck,
        piece: PIECES.EMPTY,
        pieceColor: '',
      }
    }

    return cloneSquare(squareCheck)
  })
}

function pretendPromotion(newSquare, oldSquare, squares, promotionPiece) {
  return squares.map((squareCheck) => {
    if (squareCheck.id === newSquare.id) {
      return {
        ...squareCheck,
        piece: promotionPiece,
        pieceColor: oldSquare.pieceColor,
      }
    }

    if (squareCheck.id === oldSquare.id) {
      return {
        ...squareCheck,
        piece: PIECES.EMPTY,
        pieceColor: '',
      }
    }

    return cloneSquare(squareCheck)
  })
}

function getCastleRookMove(oldSquare, newSquare) {
  const num = oldSquare.id

  if (oldSquare.pieceColor && num + 2 === newSquare.id) {
    return { oldRookId: 64, newRookId: 62 }
  }

  if (oldSquare.pieceColor && num - 2 === newSquare.id) {
    return { oldRookId: 57, newRookId: 60 }
  }

  if (!oldSquare.pieceColor && num + 2 === newSquare.id) {
    return { oldRookId: 8, newRookId: 6 }
  }

  return { oldRookId: 1, newRookId: 4 }
}

export function findMoves(square, squares, castling, enpassent) {
  let moves = []

  switch (square.piece) {
    case PIECES.PAWN:
      moves = pawnMove(square, squares, castling, enpassent)
      break
    case PIECES.BISHOP:
      moves = bishopMove(square, squares, castling, enpassent)
      break
    case PIECES.KNIGHT:
      moves = knightMove(square, squares, castling, enpassent)
      break
    case PIECES.ROOK:
      moves = rookMove(square, squares, castling, enpassent)
      break
    case PIECES.QUEEN:
      moves = bishopMove(square, squares, castling, enpassent).concat(
        rookMove(square, squares, castling, enpassent)
      )
      break
    case PIECES.KING:
      moves = kingMove(square, squares, castling, enpassent)
      break
    default:
      break
  }

  return moves
}

function getSquare(id, squares) {
  for (const square of squares) {
    if (square.id === id) {
      return square
    }
  }

  return createEmptySquare(id)
}

function kingMove(square, squares, castling, enpassent) {
  let moves = []
  const num = square.id
  let newNum

  if ((num - 1) % 8 === 0) {
    newNum = num + 1
    if (newNum >= 1 && newNum <= 64 && getSquare(newNum, squares).pieceColor !== square.pieceColor) moves.push(newNum)
    newNum = num + 7
    if (newNum >= 1 && newNum <= 64 && getSquare(newNum, squares).pieceColor !== square.pieceColor) moves.push(newNum)
    newNum = num + 8
    if (newNum >= 1 && newNum <= 64 && getSquare(newNum, squares).pieceColor !== square.pieceColor) moves.push(newNum)
    newNum = num - 8
    if (newNum >= 1 && newNum <= 64 && getSquare(newNum, squares).pieceColor !== square.pieceColor) moves.push(newNum)
    newNum = num + 15
    if (newNum >= 1 && newNum <= 64 && getSquare(newNum, squares).pieceColor !== square.pieceColor) moves.push(newNum)
    newNum = num - 7
    if (newNum >= 1 && newNum <= 64 && getSquare(newNum, squares).pieceColor !== square.pieceColor) moves.push(newNum)
    newNum = num + 9
    if (newNum >= 1 && newNum <= 64 && getSquare(newNum, squares).pieceColor !== square.pieceColor) moves.push(newNum)
    newNum = num - 1
    if (newNum >= 1 && newNum <= 64 && getSquare(newNum, squares).pieceColor !== square.pieceColor) moves.push(newNum)
  } else if ((num - 1) % 8 === 7) {
    newNum = num - 7
    if (newNum >= 1 && newNum <= 64 && getSquare(newNum, squares).pieceColor !== square.pieceColor) moves.push(newNum)
    newNum = num - 1
    if (newNum >= 1 && newNum <= 64 && getSquare(newNum, squares).pieceColor !== square.pieceColor) moves.push(newNum)
    newNum = num + 8
    if (newNum >= 1 && newNum <= 64 && getSquare(newNum, squares).pieceColor !== square.pieceColor) moves.push(newNum)
    newNum = num - 8
    if (newNum >= 1 && newNum <= 64 && getSquare(newNum, squares).pieceColor !== square.pieceColor) moves.push(newNum)
    newNum = num + 7
    if (newNum >= 1 && newNum <= 64 && getSquare(newNum, squares).pieceColor !== square.pieceColor) moves.push(newNum)
    newNum = num - 15
    if (newNum >= 1 && newNum <= 64 && getSquare(newNum, squares).pieceColor !== square.pieceColor) moves.push(newNum)
    newNum = num + 1
    if (newNum >= 1 && newNum <= 64 && getSquare(newNum, squares).pieceColor !== square.pieceColor) moves.push(newNum)
    newNum = num - 9
    if (newNum >= 1 && newNum <= 64 && getSquare(newNum, squares).pieceColor !== square.pieceColor) moves.push(newNum)
  } else {
    newNum = num + 1
    if (newNum >= 1 && newNum <= 64 && getSquare(newNum, squares).pieceColor !== square.pieceColor) moves.push(newNum)
    newNum = num - 1
    if (newNum >= 1 && newNum <= 64 && getSquare(newNum, squares).pieceColor !== square.pieceColor) moves.push(newNum)
    newNum = num + 8
    if (newNum >= 1 && newNum <= 64 && getSquare(newNum, squares).pieceColor !== square.pieceColor) moves.push(newNum)
    newNum = num - 8
    if (newNum >= 1 && newNum <= 64 && getSquare(newNum, squares).pieceColor !== square.pieceColor) moves.push(newNum)
    newNum = num + 7
    if (newNum >= 1 && newNum <= 64 && getSquare(newNum, squares).pieceColor !== square.pieceColor) moves.push(newNum)
    newNum = num - 7
    if (newNum >= 1 && newNum <= 64 && getSquare(newNum, squares).pieceColor !== square.pieceColor) moves.push(newNum)
    newNum = num + 9
    if (newNum >= 1 && newNum <= 64 && getSquare(newNum, squares).pieceColor !== square.pieceColor) moves.push(newNum)
    newNum = num - 9
    if (newNum >= 1 && newNum <= 64 && getSquare(newNum, squares).pieceColor !== square.pieceColor) moves.push(newNum)
  }

  if (
    square.pieceColor &&
    castling[0] &&
    !isAttackedSafe(getSquare(59, squares), squares, castling, enpassent, true) &&
    !isAttackedSafe(getSquare(60, squares), squares, castling, enpassent, true) &&
    getSquare(60, squares).piece === PIECES.EMPTY &&
    getSquare(59, squares).piece === PIECES.EMPTY &&
    getSquare(58, squares).piece === PIECES.EMPTY &&
    !inCheckSafe(squares, true, castling, enpassent)
  ) {
    moves.push(59)
  }

  if (
    square.pieceColor &&
    castling[1] &&
    !isAttackedSafe(getSquare(62, squares), squares, castling, enpassent, true) &&
    !isAttackedSafe(getSquare(63, squares), squares, castling, enpassent, true) &&
    getSquare(62, squares).piece === PIECES.EMPTY &&
    getSquare(63, squares).piece === PIECES.EMPTY &&
    !inCheckSafe(squares, true, castling, enpassent)
  ) {
    moves.push(63)
  }

  if (
    !square.pieceColor &&
    castling[2] &&
    !isAttackedSafe(getSquare(3, squares), squares, castling, enpassent, false) &&
    !isAttackedSafe(getSquare(4, squares), squares, castling, enpassent, false) &&
    getSquare(2, squares).piece === PIECES.EMPTY &&
    getSquare(3, squares).piece === PIECES.EMPTY &&
    getSquare(4, squares).piece === PIECES.EMPTY &&
    !inCheckSafe(squares, false, castling, enpassent)
  ) {
    moves.push(3)
  }

  if (
    !square.pieceColor &&
    castling[3] &&
    !isAttackedSafe(getSquare(6, squares), squares, castling, enpassent, false) &&
    !isAttackedSafe(getSquare(7, squares), squares, castling, enpassent, false) &&
    getSquare(7, squares).piece === PIECES.EMPTY &&
    getSquare(6, squares).piece === PIECES.EMPTY &&
    !inCheckSafe(squares, false, castling, enpassent)
  ) {
    moves.push(7)
  }

  moves = moves.filter((move) => testMove(getSquare(move, squares), square, squares, castling, enpassent, square.pieceColor))
  return moves
}

function rookMove(square, squares, castling, enpassent) {
  let moves = []
  const num = square.id

  let newNum = num + 8
  while (
    newNum >= 1 &&
    newNum <= 64 &&
    getSquare(newNum, squares).pieceColor !== square.pieceColor &&
    getSquare(newNum - 8, squares).pieceColor !== !square.pieceColor
  ) {
    moves.push(newNum)
    newNum += 8
  }

  newNum = num - 8
  while (
    newNum >= 1 &&
    newNum <= 64 &&
    getSquare(newNum, squares).pieceColor !== square.pieceColor &&
    getSquare(newNum + 8, squares).pieceColor !== !square.pieceColor
  ) {
    moves.push(newNum)
    newNum -= 8
  }

  newNum = infinityRight(num + 1)
  while (
    newNum >= 1 &&
    newNum <= 64 &&
    getSquare(newNum, squares).pieceColor !== square.pieceColor &&
    getSquare(infinityLeft(newNum - 1), squares).pieceColor !== !square.pieceColor
  ) {
    moves.push(newNum)
    newNum = infinityRight(newNum + 1)
  }

  newNum = infinityLeft(num - 1)
  while (
    newNum >= 1 &&
    newNum <= 64 &&
    getSquare(newNum, squares).pieceColor !== square.pieceColor &&
    getSquare(infinityRight(newNum + 1), squares).pieceColor !== !square.pieceColor &&
    square.id !== newNum
  ) {
    moves.push(newNum)
    newNum = infinityLeft(newNum - 1)
  }

  moves = moves.filter((move) => testMove(getSquare(move, squares), square, squares, castling, enpassent, square.pieceColor))
  return moves
}

function knightMove(square, squares, castling, enpassent) {
  let moves = []
  const num = square.id

  if ((num - 1) % 8 === 0) {
    for (const newNum of [num + 14, num + 10, num + 23, num + 17, num - 6, num - 2, num - 15, num - 9]) {
      if (newNum >= 1 && newNum <= 64 && getSquare(newNum, squares).pieceColor !== square.pieceColor) moves.push(newNum)
    }
  } else if ((num - 1) % 8 === 1) {
    for (const newNum of [num + 14, num + 10, num + 15, num + 17, num - 6, num - 2, num - 15, num - 17]) {
      if (newNum >= 1 && newNum <= 64 && getSquare(newNum, squares).pieceColor !== square.pieceColor) moves.push(newNum)
    }
  } else if ((num - 1) % 8 === 7) {
    for (const newNum of [num + 6, num + 2, num + 15, num + 9, num - 14, num - 10, num - 23, num - 17]) {
      if (newNum >= 1 && newNum <= 64 && getSquare(newNum, squares).pieceColor !== square.pieceColor) moves.push(newNum)
    }
  } else if ((num - 1) % 8 === 6) {
    for (const newNum of [num + 6, num + 2, num + 15, num + 17, num - 14, num - 10, num - 15, num - 17]) {
      if (newNum >= 1 && newNum <= 64 && getSquare(newNum, squares).pieceColor !== square.pieceColor) moves.push(newNum)
    }
  } else {
    for (const newNum of [num + 6, num + 10, num + 15, num + 17, num - 6, num - 10, num - 15, num - 17]) {
      if (newNum >= 1 && newNum <= 64 && getSquare(newNum, squares).pieceColor !== square.pieceColor) moves.push(newNum)
    }
  }

  moves = moves.filter((move) => testMove(getSquare(move, squares), square, squares, castling, enpassent, square.pieceColor))
  return moves
}

function bishopMove(square, squares, castling, enpassent) {
  let moves = []
  const num = square.id

  let newNum = infinityRight(num + 9)
  while (
    newNum >= 1 &&
    newNum <= 64 &&
    getSquare(newNum, squares).pieceColor !== square.pieceColor &&
    getSquare(infinityLeft(newNum - 9), squares).pieceColor !== !square.pieceColor
  ) {
    moves.push(newNum)
    newNum = infinityRight(newNum + 9)
  }

  newNum = infinityLeft(num - 9)
  while (
    newNum >= 1 &&
    newNum <= 64 &&
    getSquare(newNum, squares).pieceColor !== square.pieceColor &&
    getSquare(infinityRight(newNum + 9), squares).pieceColor !== !square.pieceColor
  ) {
    moves.push(newNum)
    newNum = infinityLeft(newNum - 9)
  }

  newNum = infinityLeft(num + 7)
  while (
    newNum >= 1 &&
    newNum <= 64 &&
    getSquare(newNum, squares).pieceColor !== square.pieceColor &&
    getSquare(infinityRight(newNum - 7), squares).pieceColor !== !square.pieceColor
  ) {
    moves.push(newNum)
    newNum = infinityLeft(newNum + 7)
  }

  newNum = infinityRight(num - 7)
  while (
    newNum >= 1 &&
    newNum <= 64 &&
    getSquare(newNum, squares).pieceColor !== square.pieceColor &&
    getSquare(infinityLeft(newNum + 7), squares).pieceColor !== !square.pieceColor
  ) {
    moves.push(newNum)
    newNum = infinityRight(newNum - 7)
  }

  moves = moves.filter((move) => testMove(getSquare(move, squares), square, squares, castling, enpassent, square.pieceColor))
  return moves
}

function pawnMove(square, squares, castling, enpassent) {
  let moves = []
  const num = square.id
  const row = Math.ceil(square.id / 8)

  if (square.pieceColor) {
    if (getSquare(num - 8, squares).piece === PIECES.EMPTY) moves.push(num - 8)
    if (row === 7 && getSquare(num - 16, squares).piece === PIECES.EMPTY && getSquare(num - 8, squares).piece === PIECES.EMPTY) {
      moves.push(num - 16)
    }
    if (getSquare(infinityLeft(num - 9), squares).pieceColor === !square.pieceColor) moves.push(infinityLeft(num - 9))
    if (getSquare(infinityRight(num - 7), squares).pieceColor === !square.pieceColor) moves.push(infinityRight(num - 7))
    if (infinityRight(num + 1) === enpassent) moves.push(infinityRight(num - 7))
    if (infinityLeft(num - 1) === enpassent) moves.push(infinityLeft(num - 9))
  } else {
    if (getSquare(num + 8, squares).piece === PIECES.EMPTY) moves.push(num + 8)
    if (row === 2 && getSquare(num + 16, squares).piece === PIECES.EMPTY && getSquare(num + 8, squares).piece === PIECES.EMPTY) {
      moves.push(num + 16)
    }
    if (getSquare(infinityRight(num + 9), squares).pieceColor === !square.pieceColor) moves.push(infinityRight(num + 9))
    if (getSquare(infinityLeft(num + 7), squares).pieceColor === !square.pieceColor) moves.push(infinityLeft(num + 7))
    if (infinityRight(num + 1) === enpassent) moves.push(infinityRight(num + 9))
    if (infinityLeft(num - 1) === enpassent) moves.push(infinityLeft(num + 7))
  }

  moves = moves.filter((move) => testMove(getSquare(move, squares), square, squares, castling, enpassent, square.pieceColor))
  return moves
}

function isOver(squares, turn, castling, enpassent) {
  let moves = []

  for (const square of squares) {
    if (square.pieceColor === turn) {
      moves = moves.concat(findMoves(square, squares, castling, enpassent))
    }
  }

  return moves.length === 0
}

function inCheck(squares, turn, castling, enpassent) {
  for (const square of squares) {
    if (square.piece === PIECES.KING && square.pieceColor === turn) {
      return isAttacked(square, squares, castling, enpassent, turn)
    }
  }

  return false
}

function isAttacked(square, squares, castling, enpassent, turn) {
  const oppColor = !turn

  for (const squareCheck of squares) {
    if (squareCheck.pieceColor === oppColor) {
      if (findMoves(squareCheck, squares, castling, enpassent).includes(square.id)) {
        return true
      }
    }
  }

  return false
}

function infinityRight(id) {
  return id % 8 === 1 ? id - 8 : id
}

function infinityLeft(id) {
  return id % 8 === 0 ? id + 8 : id
}

function inCheckSafe(squares, turn, castling, enpassent) {
  for (const square of squares) {
    if (square.piece === PIECES.KING && square.pieceColor === turn) {
      return isAttackedSafe(square, squares, castling, enpassent, turn)
    }
  }

  return false
}

function isAttackedSafe(square, squares, castling, enpassent, turn) {
  const oppColor = !turn

  for (const squareCheck of squares) {
    if (squareCheck.pieceColor === oppColor) {
      if (findMovesSafe(squareCheck, squares, castling, enpassent).includes(square.id)) {
        return true
      }
    }
  }

  return false
}

function findMovesSafe(square, squares, castling, enpassent) {
  let moves = []

  switch (square.piece) {
    case PIECES.PAWN:
      moves = pawnMoveSafe(square, squares, castling, enpassent)
      break
    case PIECES.BISHOP:
      moves = bishopMoveSafe(square, squares, castling, enpassent)
      break
    case PIECES.KNIGHT:
      moves = knightMoveSafe(square, squares, castling, enpassent)
      break
    case PIECES.ROOK:
      moves = rookMoveSafe(square, squares, castling, enpassent)
      break
    case PIECES.QUEEN:
      moves = bishopMoveSafe(square, squares, castling, enpassent).concat(
        rookMoveSafe(square, squares, castling, enpassent)
      )
      break
    case PIECES.KING:
      moves = kingMoveSafe(square, squares, castling, enpassent)
      break
    default:
      break
  }

  return moves
}

function kingMoveSafe(square, squares) {
  let moves = []
  const num = square.id
  let newNum

  if ((num - 1) % 8 === 0) {
    for (const candidate of [num + 1, num + 7, num + 8, num - 8, num + 15, num - 7, num + 9, num - 1]) {
      newNum = candidate
      if (newNum >= 1 && newNum <= 64 && getSquare(newNum, squares).pieceColor !== square.pieceColor) moves.push(newNum)
    }
  } else if ((num - 1) % 8 === 7) {
    for (const candidate of [num - 7, num - 1, num + 8, num - 8, num + 7, num - 15, num + 1, num - 9]) {
      newNum = candidate
      if (newNum >= 1 && newNum <= 64 && getSquare(newNum, squares).pieceColor !== square.pieceColor) moves.push(newNum)
    }
  } else {
    for (const candidate of [num + 1, num - 1, num + 8, num - 8, num + 7, num - 7, num + 9, num - 9]) {
      newNum = candidate
      if (newNum >= 1 && newNum <= 64 && getSquare(newNum, squares).pieceColor !== square.pieceColor) moves.push(newNum)
    }
  }

  return moves
}

function pawnMoveSafe(square, squares, castling, enpassent) {
  return pawnMoveBase(square, squares, castling, enpassent)
}

function rookMoveSafe(square, squares) {
  return rookMoveBase(square, squares)
}

function knightMoveSafe(square, squares) {
  return knightMoveBase(square, squares)
}

function bishopMoveSafe(square, squares) {
  return bishopMoveBase(square, squares)
}

function pawnMoveBase(square, squares, castling, enpassent) {
  let moves = []
  const num = square.id
  const row = Math.ceil(square.id / 8)

  if (square.pieceColor) {
    if (getSquare(num - 8, squares).piece === PIECES.EMPTY) moves.push(num - 8)
    if (row === 7 && getSquare(num - 16, squares).piece === PIECES.EMPTY && getSquare(num - 8, squares).piece === PIECES.EMPTY) moves.push(num - 16)
    if (getSquare(infinityLeft(num - 9), squares).pieceColor === !square.pieceColor) moves.push(infinityLeft(num - 9))
    if (getSquare(infinityRight(num - 7), squares).pieceColor === !square.pieceColor) moves.push(infinityRight(num - 7))
    if (infinityRight(num + 1) === enpassent) moves.push(infinityRight(num - 7))
    if (infinityLeft(num - 1) === enpassent) moves.push(infinityLeft(num - 9))
  } else {
    if (getSquare(num + 8, squares).piece === PIECES.EMPTY) moves.push(num + 8)
    if (row === 2 && getSquare(num + 16, squares).piece === PIECES.EMPTY && getSquare(num + 8, squares).piece === PIECES.EMPTY) moves.push(num + 16)
    if (getSquare(infinityRight(num + 9), squares).pieceColor === !square.pieceColor) moves.push(infinityRight(num + 9))
    if (getSquare(infinityLeft(num + 7), squares).pieceColor === !square.pieceColor) moves.push(infinityLeft(num + 7))
    if (infinityRight(num + 1) === enpassent) moves.push(infinityRight(num + 9))
    if (infinityLeft(num - 1) === enpassent) moves.push(infinityLeft(num + 7))
  }

  return moves
}

function rookMoveBase(square, squares) {
  let moves = []
  const num = square.id

  let newNum = num + 8
  while (
    newNum >= 1 &&
    newNum <= 64 &&
    getSquare(newNum, squares).pieceColor !== square.pieceColor &&
    getSquare(newNum - 8, squares).pieceColor !== !square.pieceColor
  ) {
    moves.push(newNum)
    newNum += 8
  }

  newNum = num - 8
  while (
    newNum >= 1 &&
    newNum <= 64 &&
    getSquare(newNum, squares).pieceColor !== square.pieceColor &&
    getSquare(newNum + 8, squares).pieceColor !== !square.pieceColor
  ) {
    moves.push(newNum)
    newNum -= 8
  }

  newNum = infinityRight(num + 1)
  while (
    newNum >= 1 &&
    newNum <= 64 &&
    getSquare(newNum, squares).pieceColor !== square.pieceColor &&
    getSquare(infinityLeft(newNum - 1), squares).pieceColor !== !square.pieceColor
  ) {
    moves.push(newNum)
    newNum = infinityRight(newNum + 1)
  }

  newNum = infinityLeft(num - 1)
  while (
    newNum >= 1 &&
    newNum <= 64 &&
    getSquare(newNum, squares).pieceColor !== square.pieceColor &&
    getSquare(infinityRight(newNum + 1), squares).pieceColor !== !square.pieceColor &&
    square.id !== newNum
  ) {
    moves.push(newNum)
    newNum = infinityLeft(newNum - 1)
  }

  return moves
}

function knightMoveBase(square, squares) {
  let moves = []
  const num = square.id
  let candidates = []

  if ((num - 1) % 8 === 0) {
    candidates = [num + 14, num + 10, num + 23, num + 17, num - 6, num - 2, num - 15, num - 9]
  } else if ((num - 1) % 8 === 1) {
    candidates = [num + 14, num + 10, num + 15, num + 17, num - 6, num - 2, num - 15, num - 17]
  } else if ((num - 1) % 8 === 7) {
    candidates = [num + 6, num + 2, num + 15, num + 9, num - 14, num - 10, num - 23, num - 17]
  } else if ((num - 1) % 8 === 6) {
    candidates = [num + 6, num + 2, num + 15, num + 17, num - 14, num - 10, num - 15, num - 17]
  } else {
    candidates = [num + 6, num + 10, num + 15, num + 17, num - 6, num - 10, num - 15, num - 17]
  }

  for (const newNum of candidates) {
    if (newNum >= 1 && newNum <= 64 && getSquare(newNum, squares).pieceColor !== square.pieceColor) {
      moves.push(newNum)
    }
  }

  return moves
}

function bishopMoveBase(square, squares) {
  let moves = []
  const num = square.id

  let newNum = infinityRight(num + 9)
  while (
    newNum >= 1 &&
    newNum <= 64 &&
    getSquare(newNum, squares).pieceColor !== square.pieceColor &&
    getSquare(infinityLeft(newNum - 9), squares).pieceColor !== !square.pieceColor
  ) {
    moves.push(newNum)
    newNum = infinityRight(newNum + 9)
  }

  newNum = infinityLeft(num - 9)
  while (
    newNum >= 1 &&
    newNum <= 64 &&
    getSquare(newNum, squares).pieceColor !== square.pieceColor &&
    getSquare(infinityRight(newNum + 9), squares).pieceColor !== !square.pieceColor
  ) {
    moves.push(newNum)
    newNum = infinityLeft(newNum - 9)
  }

  newNum = infinityLeft(num + 7)
  while (
    newNum >= 1 &&
    newNum <= 64 &&
    getSquare(newNum, squares).pieceColor !== square.pieceColor &&
    getSquare(infinityRight(newNum - 7), squares).pieceColor !== !square.pieceColor
  ) {
    moves.push(newNum)
    newNum = infinityLeft(newNum + 7)
  }

  newNum = infinityRight(num - 7)
  while (
    newNum >= 1 &&
    newNum <= 64 &&
    getSquare(newNum, squares).pieceColor !== square.pieceColor &&
    getSquare(infinityLeft(newNum + 7), squares).pieceColor !== !square.pieceColor
  ) {
    moves.push(newNum)
    newNum = infinityRight(newNum - 7)
  }

  return moves
}
