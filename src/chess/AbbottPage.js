import { Board, PromotionSelector } from './components'
import { SectionTitle, Timeline } from '../commonComponents'
import chessBotVersionData from './data/ChessBotVersionData.json'
import { useAbbottVM } from './hooks/useAbbottVM'
import './InfinityChessPage.css'

function AbbottPage() {
  const {
    gameState,
    statusText,
    onSquareSelect,
    onPromotionSelect,
  } = useAbbottVM()

  return (
    <div className="page">
      <div className="main">
        <div className="section">
          <h1 className="game-info">{statusText}</h1>

          {gameState.promoting ? <PromotionSelector onSelect={onPromotionSelect} /> : null}

          <div className="game">
            <Board
              squares={gameState.squares}
              onSelect={onSquareSelect}
              moves={gameState.moves}
              selectedNum={gameState.selectedPiece.square.id}
              lastMove={gameState.lastmove}
              wcheck={gameState.wcheck}
              bcheck={gameState.bcheck}
            />
          </div>
        </div>

        <div className="section">
          <SectionTitle>ABOUT</SectionTitle>
          <p>
            This engine (Abbott) is very simple and probably rated about 600-700. It can only see
            one move into the future (1 move for white, 1 move for black) and evaluates positions
            based on material, king safety and control of squares. I did not put too much effort
            into the engine since I did not have enough time to commit to it, but I still wanted
            to have something to play against.
          </p>
          <br />
          <p>
            Its main skill is in its vision. It will never not take a free piece you blundered due
            to the infinite edge. This is only version 1 (V1) and I plan to develop it further in
            the future with more evaluation features and efficiency techniques like improved move
            ordering for alpha beta pruning.
          </p>
          <br />
          <p>For now though, this is the only engine for Infinity Chess.</p>
        </div>

        <div className="section">
          <SectionTitle>HISTORY</SectionTitle>
          <Timeline points={chessBotVersionData} />
        </div>
      </div>
    </div>
  )
}

export default AbbottPage
