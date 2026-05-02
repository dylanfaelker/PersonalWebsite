import PieceIcon from './PieceIcon'
import { Box } from '@mui/material'

const Square = ({ piece, squareColour, borderColour, onSelect }) => {

    const squareSx = {
        minHeight: '10vmin',
        maxHeight: '10vmin',
        minWidth: '10vmin',
        maxWidth: '10vmin',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }

    return (
        <Box 
            sx={{
                ...squareSx,
                backgroundColor: squareColour,
                border: `1px solid ${borderColour}`,
            }}
            onClick={() => onSelect()}
        >
            <PieceIcon piece={piece} />
        </Box>
    )
}

export default Square
