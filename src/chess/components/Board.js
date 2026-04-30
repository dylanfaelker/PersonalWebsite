import Square from './Square'
import PromotionSelector from './PromotionSelector'

const Board = ({ squares, onSelect, moves, selectedNum, lastMove, wcheck, bcheck, }) => {
    return (
        <>
            {Array.from({ length: 8 }, (_, rowIndex) => (
                <div className="board-row" key={rowIndex}>
                    {squares.slice(rowIndex * 8, rowIndex * 8 + 8).map((square) => (
                        <Square
                            key={square.id}
                            square={square}
                            onSelect={onSelect}
                            moves={moves}
                            selectedNum={selectedNum}
                            lastMove={lastMove}
                            wcheck={wcheck}
                            bcheck={bcheck}
                        />
                    ))}
                </div>
            ))}
        </>
    )
}

export default Board
