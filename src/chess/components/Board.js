import Square from './Square'
import { Box, useTheme } from '@mui/material'

const Board = ({ gameState, onSelectSquare, fileShift, }) => {

    const theme = useTheme()

    fileShift = fileShift % 8

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {Array.from({ length: 8 }, (_, rowIndex) => {

                const rowSqaures = gameState.squares.slice(rowIndex * 8, rowIndex * 8 + 8)
                const shiftedRow = [
                    ...rowSqaures.slice(-fileShift),
                    ...rowSqaures.slice(0, -fileShift)
                ]

            
                return (
                    <Box 
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        key={rowIndex}
                    >
                        {shiftedRow.map((square) => (
                            <Square
                                key={square.id}
                                piece={{pieceType: square.piece, pieceColour: square.pieceColor}}
                                squareColour={
                                    gameState.selectedNum === square.id ? theme.palette.df.lightGreen
                                    : gameState.moves.includes(square.id) ? theme.palette.df.white
                                    : square.id === gameState.wcheck || square.id === gameState.bcheck ? theme.palette.df.peach
                                    : square.id === gameState.lastmove ? theme.palette.df.maroon
                                    : (square.id%8 + Math.floor((square.id-1) / 8))%2 ? '#d4b187'
                                    : '#613d11'
                                }
                                borderColour={
                                    gameState.selectedNum === square.id ? theme.palette.df.darkGreen
                                    : gameState.moves.includes(square.id) ? theme.palette.df.darkGrey
                                    : square.id === gameState.wcheck || square.id === gameState.bcheck ? theme.palette.df.maroon
                                    : square.id === gameState.lastmove ? theme.palette.df.maroon
                                    : (square.id%8 + Math.floor((square.id-1) / 8))%2 ? '#d4b187'
                                    : '#613d11'
                                }
                                onSelect={() => onSelectSquare(square.id)}
                            />
                        ))}
                    </Box>
                )
            })}
        </Box>
    )
}

export default Board
