import { Board, PromotionSelector, StatusText } from './components'
import { SectionTitle, Timeline } from '../commonComponents'
import chessBotVersionData from './data/ChessBotVersionData.json'
import { useAbbottVM } from './hooks/useAbbottVM'
import { useTheme } from '@mui/material'
import { Typography, Box } from '@mui/material'

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

      {gameState.promoting ? <PromotionSelector onSelect={onPromotionSelect} /> : null}


      <Board
        squares={gameState.squares}
        onSelect={onSquareSelect}
        moves={gameState.moves}
        selectedNum={gameState.selectedPiece.square.id}
        lastMove={gameState.lastmove}
        wcheck={gameState.wcheck}
        bcheck={gameState.bcheck}
      />

      <Box sx={{ height: '50px' }}></Box>



      <Box type='flex' sx={{ flexDirection: 'column', display: 'flex', alignItems: 'center', width: '60vw' }}>

        <SectionTitle>ABOUT</SectionTitle>
        <Typography>
          This engine (Abbott) is very simple and probably rated about 600-700. It can only see
          one move into the future (1 move for white, 1 move for black) and evaluates positions
          based on material, king safety and control of squares. I did not put too much effort
          into the engine since I did not have enough time to commit to it, but I still wanted
          to have something to play against.
          <br />
          <br />
          Its main skill is in its vision. It will never not take a free piece you blundered due
          to the infinite edge. This is only version 1 (V1) and I plan to develop it further in
          the future with more evaluation features and efficiency techniques like improved move
          ordering for alpha beta pruning.
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
