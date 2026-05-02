import PieceIcon from './PieceIcon'
import { useTheme } from '@mui/material'
import { Box } from '@mui/material'

const Square = ({ square, onSelect, moves, selectedNum, lastMove, wcheck, bcheck }) => {

    const theme = useTheme()

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

    if (selectedNum === square.id) { // Square chosen
        return (
            <Box 
                sx={{
                    ...squareSx,
                    backgroundColor: theme.palette.df.lightGreen,
                    border: `1px solid ${theme.palette.df.darkGreen}`,
                }}
                onClick={() => onSelect(square)}
            >
                <PieceIcon square={square} />
            </Box>
        )
    } else if (moves.includes(square.id)) { // Square highlight
        return (
            <Box 
                sx={{
                    ...squareSx,
                    backgroundColor: theme.palette.df.white,
                    border: `1px solid ${theme.palette.df.darkGrey}`,
                }}
                onClick={() => onSelect(square)}
            >
                <PieceIcon square={square} />
            </Box>
        )
    } else if (square.id === wcheck || square.id === bcheck) { // Square check
        return (
            <Box 
                sx={{
                    ...squareSx,
                    backgroundColor: theme.palette.df.peach,
                    border: `1px solid ${theme.palette.df.maroon}`,
                }}
                onClick={() => onSelect(square)}
            >
                <PieceIcon square={square} />
            </Box>
        )
    } else if (square.id === lastMove) { // Square last
        return (
            <Box 
                sx={{
                    ...squareSx,
                    backgroundColor: theme.palette.df.maroon,
                    border: `1px solid ${theme.palette.df.maroon}`,
                }}
                onClick={() => onSelect(square)}
            >
                <PieceIcon square={square} />
            </Box>
        )
    } else if ((square.id%8 + Math.floor((square.id-1) / 8))%2) { // Square white
        return (
            <Box 
                sx={{
                    ...squareSx,
                    backgroundColor: '#d4b187',
                    border: '1px solid #d4b187',
                }}
                onClick={() => onSelect(square)}
            >
                <PieceIcon square={square} />
            </Box>
        )
    } else { // Square black
        return (
            <Box 
                sx={{
                    ...squareSx,
                    backgroundColor: '#613d11',
                    border: '1px solid #613d11',
                }}
                onClick={() => onSelect(square)}
            >
                <PieceIcon square={square} />
            </Box>
        )
    }
}

export default Square
