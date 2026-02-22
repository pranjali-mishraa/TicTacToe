import Player from "./components/player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./components/wincomb";
import GameOver from "./components/GameOver";

const PLAYER = {
  X:'Player 1',
  O:'PLayer 2'
}
const INITIAL_GAME_BOARD = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
];

function derivedActivePlayer(gameTurns){

      let currentPlayer = 'X';
      if(gameTurns.length>0 && gameTurns[0].player ==='X'){
        currentPlayer='O';
      }
       return currentPlayer;
}

function deriveWinner(gameBoard,Players){
let winner;

  for(const combi of WINNING_COMBINATIONS){
    const firstSymbol = gameBoard[combi[0].row][combi[0].column];
    const secondSymbol=gameBoard[combi[1].row][combi[1].column];

    const thridSymbol=gameBoard[combi[2].row][combi[2].column];

    if(firstSymbol && firstSymbol === secondSymbol && firstSymbol === thridSymbol){
      winner = Players[firstSymbol];
    }
  }

  return winner;
}

function deriveGameBoard(gameTurns){
let gameBoard = [...INITIAL_GAME_BOARD.map(array=>[...array])];

    for(const i of gameTurns){
      const  {square,player} = i;
        const  {row,col } = square;
        gameBoard[row][col] = player;

    }

    return gameBoard;
}

function App() {

  const [Players , setPlayers] = useState({
    X:'Player 1',
    O: 'Player 2'
  });

  const [gameTurns , setGameTurns] = useState([]);

const activePlayer = derivedActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);

    const winner = deriveWinner(gameBoard,Players);

function handleRematch(){
  setGameTurns([]);
}

function handlePlayerNameChange(symbol , newName){
  setPlayers(prevPlayer=>{
    return{
      ...prevPlayer,
      [symbol]:newName
    };
  });
}

const hasDraw = gameTurns.length==9 && !winner;

  function handleSelectSquare(rowIndex,colIndex){

   
    setGameTurns((prevTurns)=>{
      const currentPlayer = derivedActivePlayer(prevTurns);
      
      const updatedTurns=[{square : {row : rowIndex , col : colIndex} 
        ,player:currentPlayer}
        , ...prevTurns,]

        return updatedTurns;
    })
  }

  return (
  <main>
    <div id="game-container" >
      <ol id="players" className="highlight-player">
       <Player initialName = {PLAYER.X} symbol = "X" isActive={activePlayer==='X'}  
         onChangeName ={handlePlayerNameChange}
       />
       <Player initialName = {PLAYER.Y} symbol = "O" isActive={activePlayer==='O'}
        onChangeName ={handlePlayerNameChange}
       />
      </ol>
      {(winner|| hasDraw) && <GameOver winner = {winner} onRematch={handleRematch}/>}
   <GameBoard onSelectSquare ={handleSelectSquare}
   board= {gameBoard} />
    </div>
    <Log turns={gameTurns}/>
  </main>
  )
}

export default App
