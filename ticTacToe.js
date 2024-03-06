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
]

let turnCounter = 0;

slotAction = function(slotNumber) 
{
  board[slotNumber] = turnCounter % 2 == 0 ? `X` : `O`;
  buttonBoard[slotNumber].textContent = turnCounter % 2 == 0 ? `X` : `O`;
  turnCounter++;
  gameWon();
}

gameWon = function()
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
    (board[2] === board[4] && board[0] === board[6] && board[2] != `.`) 
  )
  {
    console.log(turnCounter % 2 == 0 ? `O won the game!` : `X won the game`);
    alert(turnCounter % 2 == 0 ? `O won the game!` : `X won the game`);
  }
}

restartGame = function()
{
  board = [`.`, `.`, `.`, `.`, `.`, `.`, `.`, `.`, `.`];
  turnCounter = 0;
  console.log(`game restart -------------------`);
  for(i = 0; i < 9; i++) {
    buttonBoard[i].textContent = ``
  }
}