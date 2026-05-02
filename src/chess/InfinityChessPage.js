import { Link } from 'react-router-dom'
import { SectionTitle } from '../commonComponents'
import { EngineButton, StatusText } from './components'
import { useInfinityChessVM } from './hooks/useInfinityChessVM'
import { useTheme } from '@mui/material'
import { Typography, Box } from '@mui/material'
import InfinityChess from './components/InfinityChess'

function InfinityChessPage() {
  const {
    gameState,
    statusText,
    onSquareSelect,
    onPromotionSelect,
  } = useInfinityChessVM()

  const theme = useTheme()

  return (
    <Box type='flex' sx={{ flexDirection: 'column', display: 'flex', alignItems: 'center', backgroundColor: theme.palette.df.darkGreen }}>
        
      <Box sx={{ height: 100 }}></Box>

      <StatusText>
        {statusText}
      </StatusText>

      <InfinityChess
        onPromotionSelect={onPromotionSelect} //TODO move these into the infinity chess component.
        onSquareSelect={onSquareSelect}
        gameState={gameState}
      />

      <Box sx={{ height: '30px' }}></Box>

      <Link to="/InfinityChess/Engine" sx={{ textDecoration: 'none' }}>
        <EngineButton>ABBOTT ENGINE</EngineButton>
      </Link>

      <Box sx={{ height: '50px' }}></Box>

        <Box type='flex' sx={{ flexDirection: 'column', display: 'flex', alignItems: 'center', width: '60vw' }}>

          <SectionTitle>RULES</SectionTitle>
          <Typography>
            It's the same as vanilla chess with one key distinction. Like Pac-Man, if you go off 
            one side of the board, you will appear on the other.
            This only applies to the files (left to right). You cannot go from the first rank
            (row) to the eigth rank since white would win on the first move.
            <br />
            <br />
            For example, if a rook was on a1 and there was a bishop on c1, the rook could get to
            d1 by sliding off the left side of the board, appearing on the right, and continuing
            to d1.
            <br />
            <br />
            It may be helpful to think of it as there being 3 of the exact same boards laid beside
            each other. If the white queen from the middle board sees the black king on the right
            board, black is in check.
          </Typography>

          <Box sx={{ height: '50px' }}></Box>
          
        </Box>
    </Box>
  )
}

export default InfinityChessPage
