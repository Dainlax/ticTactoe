let stats = JSON.parse(localStorage.getItem(`stats`));

if (stats === null) {
  stats = {
    xWins: 0,
    oWins: 0,
    ties: 0
  };
} 


let board = [`.`, `.`, `.`, `.`, `.`, `.`, `.`, `.`, `.`];
let buttonBoard = [
  document.querySelector(`.slot1`),
  document.querySelector(`.slot2`),
  document.querySelector(`.slot3`),
  document.querySelector(`.slot4`),
  document.querySelector(`.slot5`),
  document.querySelector(`.slot6`),
  document.querySelector(`.slot7`),
  document.querySelector(`.slot8`),
  document.querySelector(`.slot9`),
];


const statsElement = document.querySelector(`.stats`);
statsElement.textContent = `X wins: ${stats.xWins}. O wins: ${stats.oWins}. Ties: ${stats.ties}.`;

let turnCounter = 0;

const slotAction = function(slotNumber) 
{
  board[slotNumber] = turnCounter % 2 == 0 ? `X` : `O`;
  buttonBoard[slotNumber].textContent = turnCounter % 2 == 0 ? `X` : `O`;
  turnCounter % 2 == 0 ? buttonBoard[slotNumber].style = `color: red;` : buttonBoard[slotNumber].style = `color: blue;`;
  document.body.style = turnCounter % 2 == 1 ? 
  `background-image: linear-gradient(to right, rgb(243, 132, 132), rgb(105, 34, 34)); transition: 1s;`
  :
   `background-image: linear-gradient(to right, rgb(68, 163, 252), rgb(25, 64, 122)); transition :1s;`;
  turnCounter++;
  gameWon();
}

const gameWon = function()
{
  if 
  (
    (board[0] === board[1] && board[0] === board[2] && board[0] != `.`) || 
    (board[3] === board[4] && board[3] === board[5] && board[3] != `.`) || 
    (board[6] === board[7] && board[6] === board[8] && board[6] != `.`) || 
    (board[0] === board[3] && board[0] === board[6] && board[0] != `.`) || 
    (board[1] === board[4] && board[1] === board[7] && board[1] != `.`) || 
    (board[2] === board[5] && board[2] === board[8] && board[2] != `.`) || 
    (board[0] === board[4] && board[0] === board[8] && board[0] != `.`) || 
    (board[2] === board[4] && board[2] === board[6] && board[2] != `.`) 
  )
  {
    setTimeout(function() {
      alert(turnCounter % 2 == 0 ? `O won the game!` : `X won the game`);
    }, 20);
    turnCounter % 2 == 0 ? stats.oWins++ : stats.xWins++;
    statsElement.textContent = `X wins: ${stats.xWins}. O wins: ${stats.oWins}. Ties: ${stats.ties}.`;
    localStorage.setItem(`stats`, JSON.stringify(stats));
  }
  else if (turnCounter >= 9) {
    setTimeout(function() {
      alert(`It's a tie`);
    }, 20);
    stats.ties++
    statsElement.textContent = `X wins: ${stats.xWins}. O wins: ${stats.oWins}. Ties: ${stats.ties}.`;
    localStorage.setItem(`stats`, JSON.stringify(stats));
  }
}

const restartGame = function()
{
  board = [`.`, `.`, `.`, `.`, `.`, `.`, `.`, `.`, `.`];
  turnCounter = 0;
  for(i = 0; i < 9; i++) {
    buttonBoard[i].textContent = ``
    buttonBoard[i].style = `color: black;`
  }
  document.querySelector(`body`).style = `background-image: linear-gradient(to right, rgb(27, 99, 12), rgb(25, 153, 46));`;
}

const resetScore = function() {
  stats.xWins = 0;
  stats.oWins = 0;
  stats.ties= 0;
  localStorage.setItem(`stats`, JSON.stringify(stats));
  statsElement.textContent = `X wins: ${stats.xWins}. O wins: ${stats.oWins}. Ties: ${stats.ties}.`;
}

