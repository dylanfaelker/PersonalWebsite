import { StatusText } from './components'
import { SectionTitle, Timeline } from '../commonComponents'
import chessBotVersionData from './data/ChessBotVersionData.json'
import { useAbbottVM } from './hooks/useAbbottVM'
import { useTheme } from '@mui/material'
import { Typography, Box } from '@mui/material'
import InfinityChess from './components/InfinityChess'

function AbbottPage() {
  const {
    gameState,
    statusText,
    onSquareSelect,
    onPromotionSelect,
  } = useAbbottVM()

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

      <Box sx={{ height: '50px' }}></Box>



      <Box type='flex' sx={{ flexDirection: 'column', display: 'flex', alignItems: 'center', width: '60vw' }}>

        <SectionTitle>ABOUT</SectionTitle>
        <Typography>
          This engine (Abbott) is very simple and probably rated about 200. It can only see
          one move into the future (2 ply) and evaluates positions based on material,
          king safety and control of squares. It is really just a simple opponent that can be played against.
          <br />
          <br />
          Its main skill is in its vision. It will never not take a free piece you blundered due
          to the infinite edge. This is only a basic engine and I plan to develop it further in
          the future with more evaluation features and efficiency techniques.
          <br />
          <br />
          For now though, this is the only engine for Infinity Chess.
        </Typography>

        <Box sx={{ height: '50px' }}></Box>

        <SectionTitle>HISTORY</SectionTitle>
        <Timeline points={chessBotVersionData} />

        <Box sx={{ height: '50px' }}></Box>

      </Box>
      
    </Box>
  )
}

export default AbbottPage
