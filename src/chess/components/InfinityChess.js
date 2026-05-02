import Board from './Board'
import PromotionSelector from './PromotionSelector'
import { Box, useTheme, useMediaQuery } from '@mui/material'
import { KeyboardArrowRightRounded, KeyboardArrowLeftRounded } from '@mui/icons-material'
import { useState, useRef, useEffect } from 'react'

const InfinityChess = ({ onPromotionSelect, onSquareSelect, gameState }) => {

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
    const arrowSize = isMobile ? 26 : 52

    const [fileShift, setFileShift] = useState(0)

    // Scroll wheel for the board. Prevents scrolling the page
    const boardRef = useRef(null)
    useEffect(() => {
        const board = boardRef.current
        if (!board) return

        const handleWheel = (event) => {
            event.preventDefault()

            if (event.deltaY > 0 || event.deltaX < 0) {
                setFileShift((prev) => prev - 1)
            } else if (event.deltaY < 0 || event.deltaX > 0) {
                setFileShift((prev) => prev + 1)
            }
        }

        board.addEventListener('wheel', handleWheel, { passive: false })

        // Cleanup on unmount
        return () => board.removeEventListener('wheel', handleWheel)
    }, [])


    return (
        <Box sx={{ position: 'relative', display: 'inline-block' }}>

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

            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch' }}>

                <Box 
                    sx={{ 
                        width: '5vmin', 
                        backgroundColor: theme.palette.df.darkGrey, 
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                    }}
                    onClick={() => setFileShift(fileShift - 1)}
                >
                    <KeyboardArrowLeftRounded 
                        sx={{
                            color: theme.palette.df.lightGreen,
                            height: arrowSize,
                            width: arrowSize,
                        }}
                    />
                </Box>

                <Box 
                    sx={{touchAction: 'none'}}
                    ref={(boardRef)}
                >
                    <Board
                        gameState={gameState}
                        onSelectSquare={onSquareSelect}
                        fileShift={fileShift}
                    />
                </Box>

                <Box 
                    sx={{ 
                        width: '5vmin', 
                        backgroundColor: theme.palette.df.darkGrey, 
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                     }}
                    onClick={() => setFileShift(fileShift + 1)}
                >
                    <KeyboardArrowRightRounded 
                        sx={{
                            color: theme.palette.df.lightGreen,
                            height: arrowSize,
                            width: arrowSize,
                        }}
                    />
                </Box>
            </Box>

        </Box>
    )
}

export default InfinityChess