import { PIECES } from './chessConstants'
import { applyMoveByIds, findMoves } from './chessModel'

const SEARCH_DEPTH = 1

export function findAbbottMove(gameState) {
  let bestEvaluation = Infinity
  let bestMove = null
  let alpha = -Infinity
  let beta = Infinity

  for (const square of gameState.squares) {
    if (square.pieceColor !== gameState.turn) {
      continue
    }

    const moves = findMoves(square, gameState.squares, gameState.castling, gameState.enpassent)

    for (const moveId of moves) {
      const candidateStates = getCandidateStates(gameState, square.id, moveId)

      for (const candidate of candidateStates) {
        const evaluation = search(candidate.state, 0.5, alpha, beta)

        if (bestMove === null || evaluation < bestEvaluation) {
          bestEvaluation = evaluation
          bestMove = candidate
        }

        beta = Math.min(beta, evaluation)
        if (beta <= alpha) {
          return bestMove
        }
      }
    }
  }

  return bestMove
}

function search(gameState, inFuture, alpha, beta) {
  if (inFuture >= SEARCH_DEPTH || gameState.checkmate || gameState.stalemate || gameState.draw) {
    return evaluatePosition(gameState)
  }

  if (gameState.turn) {
    let best = -Infinity

    for (const square of gameState.squares) {
      if (square.pieceColor !== gameState.turn) {
        continue
      }

      const moves = findMoves(square, gameState.squares, gameState.castling, gameState.enpassent)

      for (const moveId of moves) {
        const candidateStates = getCandidateStates(gameState, square.id, moveId)

        for (const candidate of candidateStates) {
          const evaluation = search(candidate.state, inFuture + 0.5, alpha, beta)
          best = Math.max(best, evaluation)
          alpha = Math.max(alpha, evaluation)

          if (beta <= alpha) {
            return best
          }
        }
      }
    }

    return best
  }

  let best = Infinity

  for (const square of gameState.squares) {
    if (square.pieceColor !== gameState.turn) {
      continue
    }

    const moves = findMoves(square, gameState.squares, gameState.castling, gameState.enpassent)

    for (const moveId of moves) {
      const candidateStates = getCandidateStates(gameState, square.id, moveId)

      for (const candidate of candidateStates) {
        const evaluation = search(candidate.state, inFuture + 0.5, alpha, beta)
        best = Math.min(best, evaluation)
        beta = Math.min(beta, evaluation)

        if (beta <= alpha) {
          return best
        }
      }
    }
  }

  return best
}

function getCandidateStates(gameState, fromId, toId) {
  const fromSquare = gameState.squares.find((square) => square.id === fromId)
  if (!fromSquare) {
    return []
  }

  if (isPromotionSquare(fromSquare)) {
    return [PIECES.KNIGHT, PIECES.QUEEN].map((promotionPiece) => ({
      fromId,
      toId,
      promotionPiece,
      state: applyMoveByIds(gameState, fromId, toId, promotionPiece),
    }))
  }

  return [
    {
      fromId,
      toId,
      promotionPiece: null,
      state: applyMoveByIds(gameState, fromId, toId),
    },
  ]
}

function isPromotionSquare(square) {
  const row = Math.ceil(square.id / 8)
  return square.piece === PIECES.PAWN && ((square.pieceColor && row === 2) || (!square.pieceColor && row === 7))
}

function evaluatePosition(gameState) {
  if (gameState.checkmate) {
    return gameState.turn ? -Infinity : Infinity
  }

  if (gameState.stalemate || gameState.draw) {
    return 0
  }

  let evaluation = 0
  evaluation += evaluateMaterial(gameState.squares)
  evaluation += evaluateControl(gameState, true)
  evaluation -= evaluateControl(gameState, false)
  return evaluation
}

function evaluateMaterial(squares) {
  let evaluation = 0

  for (const square of squares) {
    const pieceValue = getPieceValue(square.piece)
    if (!pieceValue) {
      continue
    }

    evaluation += square.pieceColor ? pieceValue : -pieceValue
  }

  return evaluation
}

function getPieceValue(piece) {
  switch (piece) {
    case PIECES.PAWN:
      return 100
    case PIECES.BISHOP:
      return 325
    case PIECES.KNIGHT:
      return 300
    case PIECES.ROOK:
      return 500
    case PIECES.QUEEN:
      return 900
    default:
      return 0
  }
}

function evaluateControl(gameState, turn) {
  const levelVal = 25
  const sameSideVal = 10
  const oppSideVal = 20
  let evaluation = 0

  for (const square of gameState.squares) {
    if (square.pieceColor !== turn) {
      continue
    }

    const moves = findMoves(square, gameState.squares, gameState.castling, gameState.enpassent)
    evaluation += moves.length * levelVal

    for (const moveId of moves) {
      const row = Math.ceil(moveId / 8)
      evaluation += turn ? (row <= 4 ? oppSideVal : sameSideVal) : (row >= 5 ? oppSideVal : sameSideVal)
    }
  }

  return evaluation
}
