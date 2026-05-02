import Square from './Square'
import { Box, useTheme } from '@mui/material'

const Board = ({ squares, onSelect, moves, selectedNum, lastMove, wcheck, bcheck, }) => {

    const theme = useTheme()

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
                            piece={{pieceType: square.piece, pieceColour: square.pieceColor}}
                            squareColour={
                                selectedNum === square.id ? theme.palette.df.lightGreen
                                : moves.includes(square.id) ? theme.palette.df.white
                                : square.id === wcheck || square.id === bcheck ? theme.palette.df.peach
                                : square.id === lastMove ? theme.palette.df.maroon
                                : (square.id%8 + Math.floor((square.id-1) / 8))%2 ? '#d4b187'
                                : '#613d11'
                            }
                            borderColour={
                                selectedNum === square.id ? theme.palette.df.darkGreen
                                : moves.includes(square.id) ? theme.palette.df.darkGrey
                                : square.id === wcheck || square.id === bcheck ? theme.palette.df.maroon
                                : square.id === lastMove ? theme.palette.df.maroon
                                : (square.id%8 + Math.floor((square.id-1) / 8))%2 ? '#d4b187'
                                : '#613d11'
                            }
                            onSelect={() => onSelect(square.id)}
                        />
                    ))}
                </Box>
            ))}
        </>
    )
}

export default Board
