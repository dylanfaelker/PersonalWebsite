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
        onPromotionSelect={onPromotionSelect}
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
            Pieces all move the same as normal chess including enpassent and castling. The only
            change is, like Pacman, if you go off one side of the board, you will appear on the
            other.
            <br />
            <br />
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

          <SectionTitle>ABOUT</SectionTitle>
          <Typography>
            In 2020, the world was hit with a pandemic leaving many people at home. During this
            time people looked for things to do. Due to this, and the hit Netflix series The
            Queen&apos;s Gambit, many started playing chess.
            <br />
            <br />
            My friends and I were part of this group and after a few months of playing, my friend
            Richard He approached me with the idea for this game which combines Pacman and Chess.
            <br />
            <br />
            There is a similar variant to chess called infinite chess where the board is unbounded
            in all directions, but the board never wraps and that&apos;s where the difference lies.
            <br />
            <br />
            I was originally learning Java at the time and tried to create it in that language but
            after a couple bugs and not enough patience to understand how to make proper graphics,
            I gave up.
            <br />
            <br />
            About a month later, I entered into a hackathon and decided to give the idea another
            try, except in Python and starting out with a half completed chess game. This did not
            go very well as the original chess game did not have any of the more complicated rules
            of chess and it had a bug where it became unplayable after about 20 moves.
            <br />
            <br />
            I eventually decided to give it another go in React since I was working on resumes and
            a personal website when I realised I did not have many interesting side projects. I
            was already using React for my website and it seemed a lot easier to get working. I
            have since finished this project and I&apos;m now working on a chess bot.
          </Typography>

          <Box sx={{ height: '50px' }}></Box>
          
        </Box>
    </Box>
  )
}

export default InfinityChessPage
