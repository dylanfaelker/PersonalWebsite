import { useEffect, useState } from 'react'
import { findAbbottMove } from '../domain/abbottEngine'
import {
  applyMoveByIds,
  getStatusText,
  pickPromotion,
  selectSquare,
} from '../domain/chessModel'
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
      setGameState((currentState) => {
        if (currentState.turn || currentState.checkmate || currentState.stalemate || currentState.draw || currentState.promoting) {
          return currentState
        }

        const move = findAbbottMove(currentState)
        if (!move) {
          return currentState
        }

        return applyMoveByIds(currentState, move.fromId, move.toId, move.promotionPiece)
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
