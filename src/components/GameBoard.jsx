import { useState } from "react";


const intialGameBoard = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
];

export default function(){
    const [gameBoard , setGameBoard] = useState (intialGameBoard);

    function handleSelectSquare(rowIndex,colIndex){
        setGameBoard((prevBoard)=>{
            const updatedBoard= {...prevBoard.map(innerArray=>[...innerArray])};
            updatedBoard[rowIndex,colIndex]='X';
            return updatedBoard;
        })
    }

    return (
        <ol id="game-board">
{
    gameBoard.map((row,rowIndex)=> <li key={row}>
         <ol>
         {
          row.map((playerSymbol,colIndex)=> <li key={colIndex}><button onClick={()=>handleSelectSquare(rowIndex,colIndex)}>{playerSymbol}</button></li> )
         }
         </ol>
    </li>)
}
        </ol>
    )
}