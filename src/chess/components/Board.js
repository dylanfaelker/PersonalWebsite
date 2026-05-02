import Square from './Square'
import PromotionSelector from './PromotionSelector'
import { Box } from '@mui/material'

const Board = ({ squares, onSelect, moves, selectedNum, lastMove, wcheck, bcheck, }) => {
    return (
        <>
            {Array.from({ length: 8 }, (_, rowIndex) => (
                <Box 
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    key={rowIndex}
                >
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
                </Box>
            ))}
        </>
    )
}

export default Board
