import { Box } from '@mui/material'
import { PROMOTION_PIECES } from '../domain/chessConstants'
import Square from './Square'

function PromotionSelector({ onSelect }) {
  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {PROMOTION_PIECES.map((piece) => (
        <Square
            key={piece.value}
            piece={{pieceType: piece.value, pieceColour: piece.value % 2 !== 0}}
            squareColour={
                piece.value % 2 === 0 ? '#d4b187'
                : '#613d11'
            }
            borderColour={
                piece.value % 2 === 0 ? '#d4b187'
                : '#613d11'
            }
            onSelect={() => onSelect(piece.value)}
        />
      ))}
    </Box>
  )
}

export default PromotionSelector
