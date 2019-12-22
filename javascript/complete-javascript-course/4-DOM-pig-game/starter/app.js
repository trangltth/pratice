/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he 
whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets 
lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his 
ROUND score gets added to his GLBAL score. After that, it's 
the next player's turn
- The first player to reach 100 points on GLOBAL score wins 
the game

*/

let scores, roundScore, activePlayer, dice;
activePlayer = 0
reset()

document.querySelector('.btn-roll').addEventListener('click', function (){
    //1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;

    //2. Display the result
    var diceDOM = document.querySelector('.dice')
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    //3. Update the round score If the rolled number was NOT a l
    if (dice === 1){
      next_player()

    } else {
      roundScore += dice
      document.getElementById('current-' + activePlayer).textContent = roundScore;
    }

})

document.querySelector('.btn-hold').addEventListener('click', function(){
    scores[activePlayer] += roundScore;   
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer]
    
    // check if player won game
    if (document.getElementById('score-' + activePlayer).textContent >= 20){
      document.querySelector('.result').textContent = 'Player ' + (activePlayer+1) + ' WIN!'
      
      document.querySelector('.btn-hold').disabled = true
      document.querySelector('.btn-roll').disabled = true

      document.getElementById('current-0').textContent = 0;
      document.getElementById('current-1').textContent = 0;
    } else {
      next_player()
      document.querySelector('.dice').style.display = 'None'
    }
})

document.querySelector('.btn-new').addEventListener('click', function() {
    document.querySelector('.btn-hold').disabled = false
    document.querySelector('.btn-roll').disabled = false
    document.querySelector('.result').textContent = ''
    reset()
})

function reset(){
  roundScore = 0;
  scores=[0,0];
  activePlayer === 1 ? activePlayer = 0: activePlayer = 1; 
  document.getElementById('current-0').textContent = 0
  document.getElementById('current-1').textContent = 0
  document.getElementById('score-0').textContent = 0
  document.getElementById('score-1').textContent = 0
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-'+ activePlayer +'-panel').classList.add('active');
}

function next_player(){
  document.getElementById('current-' + activePlayer).textContent = 0;

  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; 
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  roundScore = 0;
}
