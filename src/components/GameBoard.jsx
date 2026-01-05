


const intialGameBoard = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
];

export default function GameBoard({onSelectSquare,turn}){

    let gameBoard = intialGameBoard;

    for(const i of turn){
      const  {square,player} = i;
        const  {row,col } = square;
        gameBoard[row][col] = player;

    }
    // const [gameBoard , setGameBoard] = useState (intialGameBoard);

    // function handleSelectSquare(rowIndex,colIndex){
    //     setGameBoard((prevBoard)=>{
    //     const updatedBoard = prevBoard.map(innerArray => [...innerArray]);

    //         updatedBoard[rowIndex][colIndex]=activePlayerSymbol;
    //         return updatedBoard;
    //     })
    //     onSelectSquare();
    // }


    return (
        <ol id="game-board">
{
    gameBoard.map((row,rowIndex)=> 
    <li key={rowIndex}>
         <ol>
         {row.map((playerSymbol,colIndex)=> <li key={colIndex}>
            <button onClick={()=>onSelectSquare(rowIndex,colIndex)}>
            {playerSymbol}</button></li> )
         }
         </ol>
    </li>)
}
        </ol>
    )
}