import { useState } from 'react'
import { getStatusText, pickPromotion, selectSquare } from '../domain/chessModel'
import { createInitialGameState } from '../domain/chessState'

export function useInfinityChessVM() {
  const [gameState, setGameState] = useState(createInitialGameState)

  const onSquareSelect = (square) => {
    setGameState((currentState) => selectSquare(currentState, square.id))
  }

  const onPromotionSelect = (piece) => {
    setGameState((currentState) => pickPromotion(currentState, piece))
  }

  return {
    gameState,
    statusText: getStatusText(gameState),
    onSquareSelect,
    onPromotionSelect,
  }
}
