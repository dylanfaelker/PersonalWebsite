import Board from './Board'
import PromotionSelector from './PromotionSelector'
import { Box } from '@mui/material'

const InfinityChess = ({ onPromotionSelect, onSquareSelect, gameState }) => {

    return (
        <Box sx={{ position: 'relative' }}>

            {gameState.promoting ? (
                <Box 
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 10,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <PromotionSelector onSelect={onPromotionSelect} />
                </Box>
            ) : null}

            <Board
                squares={gameState.squares}
                onSelect={onSquareSelect}
                moves={gameState.moves}
                selectedNum={gameState.selectedPiece.square.id}
                lastMove={gameState.lastmove}
                wcheck={gameState.wcheck}
                bcheck={gameState.bcheck}
            />

        </Box>
    )
}

export default InfinityChess