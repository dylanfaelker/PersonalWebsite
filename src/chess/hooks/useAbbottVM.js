import { useEffect, useState } from 'react'
import {
  applyMoveByIds,
  findMoves,
  getStatusText,
  pickPromotion,
  selectSquare,
} from '../domain/chessModel'
import { requestAbbottMove } from '../domain/abbottApi'
import { createInitialGameState } from '../domain/chessState'

export function useAbbottVM() {
  const [gameState, setGameState] = useState(createInitialGameState)

  const onSquareSelect = (square) => {
    setGameState((currentState) => {
      if (!currentState.turn) {
        return currentState
      }

      return selectSquare(currentState, square.id)
    })
  }

  const onPromotionSelect = (piece) => {
    setGameState((currentState) => pickPromotion(currentState, piece))
  }

  useEffect(() => {
    if (gameState.turn || gameState.checkmate || gameState.stalemate || gameState.draw || gameState.promoting) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      requestAbbottMove(gameState)
        .then((move) => {
          setGameState((currentState) => {
            if (
              currentState.turn ||
              currentState.checkmate ||
              currentState.stalemate ||
              currentState.draw ||
              currentState.promoting
            ) {
              return currentState
            }

            const fromSquare = currentState.squares.find((square) => square.id === move.fromId)
            if (!fromSquare || fromSquare.pieceColor !== currentState.turn) {
              console.error('Abbott returned an invalid from-square', move)
              return currentState
            }

            const legalMoves = findMoves(
              fromSquare,
              currentState.squares,
              currentState.castling,
              currentState.enpassent
            )

            if (!legalMoves.includes(move.toId)) {
              console.error('Abbott returned an illegal move', move)
              return currentState
            }

            return applyMoveByIds(currentState, move.fromId, move.toId, move.promotionPiece)
          })
        })
        .catch((error) => {
          console.error('Abbott API request failed', error)
        })
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [gameState])

  return {
    gameState,
    statusText: getStatusText(gameState),
    onSquareSelect,
    onPromotionSelect,
  }
}
