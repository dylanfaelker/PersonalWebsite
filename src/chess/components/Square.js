const Square = ({ square, onSelect, moves, selectedNum, lastMove, wcheck, bcheck }) => {
    return (
        <div 
            className={(selectedNum === square.id ? 'square-chosen' : (moves.includes(square.id) ? 'square-highlight' : (square.id === wcheck || square.id === bcheck) ? 'square-check' : (square.id === lastMove ? 'square-last' : (((square.id%8 + Math.floor((square.id-1) / 8))%2)  ? 'square-white' : "square-black"))))}
            onClick={() => onSelect(square)}
        >
            {square.icon}
        </div>
    )
}

export default Square
