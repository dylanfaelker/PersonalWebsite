import { useState } from 'react'
import { getStatusText, pickPromotion, selectSquare } from '../domain/chessModel'
import { createInitialGameState } from '../domain/chessState'
import usePageTitle from '../../commonHooks/usePageTitle'

export function useInfinityChessVM() {

  usePageTitle('Infinity Chess')

  const [gameState, setGameState] = useState(createInitialGameState)

  const onSquareSelect = (id) => {
    setGameState((currentState) => selectSquare(currentState, id))
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
