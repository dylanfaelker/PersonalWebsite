import { PROMOTION_PIECES } from '../domain/chessConstants'

function PromotionSelector({ onSelect }) {
  return (
    <div className="promotion-buttons">
      {PROMOTION_PIECES.map((piece) => (
        <button
          key={piece.value}
          onClick={() => onSelect(piece.value)}
          className="btn"
        >
          {piece.label}
        </button>
      ))}
    </div>
  )
}

export default PromotionSelector
