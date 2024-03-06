const stats = JSON.parse(localStorage.getItem(`score`))

let symbolNumber, symbol, userSymbol;


gameAlert = function(gameResult) {
  if (gameResult == 1)    gameResult = `You won`;  
  else if (gameResult == 2) gameResult = `You lost`;
  else gameResult = `It's a tie`;

  alert
  (`You picked ${userSymbol}. Computer picked ${symbol}. ${gameResult}. 
Wins: ${stats.wins} Losses: ${stats.losses} Ties: ${stats.ties}`);
};

rockPaperScissors = function(userSymbolNumber) 
{
  symbolNumber = Math.trunc(3 * Math.random());

  if (symbolNumber === 0) symbol = `rock`;
  else if (symbolNumber == 1) symbol = `paper`;
  else symbol = `scissors`;

  if (userSymbolNumber === 0) userSymbol = `rock`;
  else if (userSymbolNumber === 1) userSymbol = `paper`;
  else userSymbol = `scissors`;

  if (symbolNumber === userSymbolNumber)
  {
    stats.ties++;
    gameAlert(3);
  }
  else if (
      (symbol === `rock` && userSymbol === `paper`) ||
      (symbol === `paper` && userSymbol === `scissors`) ||
      (symbol === `scissors` && userSymbol === `rock`)
    )
    {
      stats.wins++;
      gameAlert(1);
    }
  else 
    {
      stats.losses++;
      gameAlert(2);
    }
  localStorage.setItem(`score`, JSON.stringify(stats));
}

resetStats = function() {
  stats.wins = 0;
  stats.losses = 0;
  stats.ties = 0;
  localStorage.removeItem(`score`)
}

