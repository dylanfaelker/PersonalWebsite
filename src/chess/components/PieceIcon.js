import bbishop from '../assets/bbishop.png'
import bking from '../assets/bking.png'
import bknight from '../assets/bknight.png'
import bpawn from '../assets/bpawn.png'
import bqueen from '../assets/bqueen.png'
import brook from '../assets/brook.png'
import wbishop from '../assets/wbishop.png'
import wking from '../assets/wking.png'
import wknight from '../assets/wknight.png'
import wpawn from '../assets/wpawn.png'
import wqueen from '../assets/wqueen.png'
import wrook from '../assets/wrook.png'
import { PIECES } from '../domain/chessConstants'

const pieceIcons = {
  true: {
    [PIECES.PAWN]: { src: wpawn, alt: 'white pawn' },
    [PIECES.BISHOP]: { src: wbishop, alt: 'white bishop' },
    [PIECES.KNIGHT]: { src: wknight, alt: 'white knight' },
    [PIECES.ROOK]: { src: wrook, alt: 'white rook' },
    [PIECES.QUEEN]: { src: wqueen, alt: 'white queen' },
    [PIECES.KING]: { src: wking, alt: 'white king' },
  },
  false: {
    [PIECES.PAWN]: { src: bpawn, alt: 'black pawn' },
    [PIECES.BISHOP]: { src: bbishop, alt: 'black bishop' },
    [PIECES.KNIGHT]: { src: bknight, alt: 'black knight' },
    [PIECES.ROOK]: { src: brook, alt: 'black rook' },
    [PIECES.QUEEN]: { src: bqueen, alt: 'black queen' },
    [PIECES.KING]: { src: bking, alt: 'black king' },
  },
}

function PieceIcon({ square }) {
  if (!square.piece) {
    return null
  }

  const icon = pieceIcons[String(square.pieceColor)]?.[square.piece]

  if (!icon) {
    return null
  }

  return <img 
    src={icon.src} 
    style={{
      minHeight: '9vmin',
      maxHeight: '9vmin',
      minWidth: '9vmin',
      maxWidth: '9vmin',
    }} 
    alt={icon.alt} 
  />
}

export default PieceIcon
