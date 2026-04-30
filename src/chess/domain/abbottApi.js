import { PIECES } from './chessConstants'

const localConfig = {
  devAbbottMode:
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'),
}

export const ABBOTT_API_BASE_URL = localConfig.devAbbottMode
  ? 'http://127.0.0.1:5000'
  : 'https://abbott-chess-engine.onrender.com'
export const ABBOTT_HEALTH_PATH = '/health'
export const ABBOTT_MOVE_PATH = '/move'

const DEFAULT_SEARCH_DEPTH = 2

const pieceToFen = {
  [PIECES.PAWN]: 'p',
  [PIECES.BISHOP]: 'b',
  [PIECES.KNIGHT]: 'n',
  [PIECES.ROOK]: 'r',
  [PIECES.QUEEN]: 'q',
  [PIECES.KING]: 'k',
}

const uciPromotionToPiece = {
  b: PIECES.BISHOP,
  n: PIECES.KNIGHT,
  q: PIECES.QUEEN,
  r: PIECES.ROOK,
}

export async function requestAbbottMove(gameState, depth = DEFAULT_SEARCH_DEPTH) {
  const response = await fetch(`${ABBOTT_API_BASE_URL}${ABBOTT_MOVE_PATH}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fen: gameStateToFen(gameState),
      depth,
    }),
  })

  const payload = await response.json()

  if (!response.ok) {
    throw new Error(payload.error || 'Abbott move request failed')
  }

  if (!payload.move || typeof payload.move !== 'string') {
    throw new Error('Abbott response did not include a move')
  }

  return uciToMove(payload.move)
}

export function gameStateToFen(gameState) {
  const rows = []

  for (let rowIndex = 0; rowIndex < 8; rowIndex += 1) {
    let emptyCount = 0
    let fenRow = ''

    for (let fileIndex = 0; fileIndex < 8; fileIndex += 1) {
      const squareId = rowIndex * 8 + (8 - fileIndex)
      const square = gameState.squares.find((candidate) => candidate.id === squareId)

      if (!square || square.piece === PIECES.EMPTY) {
        emptyCount += 1
        continue
      }

      if (emptyCount > 0) {
        fenRow += String(emptyCount)
        emptyCount = 0
      }

      const fenPiece = pieceToFen[square.piece]
      fenRow += square.pieceColor ? fenPiece.toUpperCase() : fenPiece
    }

    if (emptyCount > 0) {
      fenRow += String(emptyCount)
    }

    rows.push(fenRow)
  }

  return [
    rows.join('/'),
    gameState.turn ? 'w' : 'b',
    castlingToFen(gameState.castling),
    enPassentToFen(gameState),
    String(gameState.move50),
    String(Math.floor(gameState.history.length / 2) + 1),
  ].join(' ')
}

export function uciToMove(uciMove) {
  if (uciMove.length < 4) {
    throw new Error(`Invalid UCI move: ${uciMove}`)
  }

  return {
    fromId: algebraicToId(uciMove.slice(0, 2)),
    toId: algebraicToId(uciMove.slice(2, 4)),
    promotionPiece: uciMove[4] ? uciPromotionToPiece[uciMove[4].toLowerCase()] ?? null : null,
  }
}

function castlingToFen(castling) {
  const rights = [
    castling[1] ? 'K' : '',
    castling[0] ? 'Q' : '',
    castling[3] ? 'k' : '',
    castling[2] ? 'q' : '',
  ].join('')

  return rights || '-'
}

function enPassentToFen(gameState) {
  if (!gameState.enpassent) {
    return '-'
  }

  const pawnSquare = gameState.squares.find((square) => square.id === gameState.enpassent)
  if (!pawnSquare || pawnSquare.piece !== PIECES.PAWN) {
    return '-'
  }

  const algebraic = idToAlgebraic(pawnSquare.id)
  const file = algebraic[0]
  const rank = Number(algebraic.slice(1))
  const targetRank = pawnSquare.pieceColor ? rank - 1 : rank + 1

  return `${file}${targetRank}`
}

function idToAlgebraic(id) {
  const zeroBasedId = id - 1
  const rowIndex = Math.floor(zeroBasedId / 8)
  const localFileIndex = zeroBasedId % 8
  const standardFileIndex = 7 - localFileIndex
  const rank = 8 - rowIndex

  return `${String.fromCharCode(97 + standardFileIndex)}${rank}`
}

function algebraicToId(square) {
  const fileIndex = square.toLowerCase().charCodeAt(0) - 97
  const rank = Number(square.slice(1))
  const rowIndex = 8 - rank
  const localFileIndex = 7 - fileIndex

  return rowIndex * 8 + localFileIndex + 1
}
