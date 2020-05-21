/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. 
After that, it's the next player's turn. (Hint: Always save the previous dice roll 
in a separate variable)

2. Add an input field to the HTML where players can set the winning score, 
so that they can change the predefined score of 100. (Hint: you can read that value with 
  the .value property in JavaScript. This is a good oportunity to use google to figure this out :)

  3. Add another dice to the game, so that there are two dices now. 
The player looses his current score when one of them is a 1. 
(Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

let scores, score_player0, score_player1, scores_list, activePlayer, roundScore

scores_list = [[], []]
scores = [0,0]
activePlayer = 0
roundScore = 0

init()

document.querySelector('.btn-roll').addEventListener('click', function(){
  dice = Math.floor(Math.random() * 6) + 1;
  document.getElementById('dice').style.display = 'inline';
  document.getElementById('dice').src = "/javascript/complete-javascript-course/4-DOM-pig-game/challenges_1/images/dice-" + dice + ".png";
  
  // check if 6 exist or not
  if (dice === 6 & scores_list[activePlayer].indexOf(dice) > -1){
    scores_list[activePlayer] = []
    document.querySelector('.current-' + activePlayer).textContent = 0
    roundScore = 0    
    changePlayer()    
  } else{
    scores_list[activePlayer].push(dice)
    roundScore += dice
    document.querySelector('.current-'+activePlayer).textContent = roundScore
  }
})

document.querySelector('.btn-hold').addEventListener('click', function(){
  scores[activePlayer] += roundScore  
  document.querySelector('.score-' + activePlayer).textContent = scores[activePlayer]
  document.querySelector('.current-' + activePlayer).textContent = 0
  scores_list[activePlayer] = []
  //if win
  if (scores[activePlayer] >= 100){
    document.querySelector('.alert_winner').style.display = 'inline'
    document.querySelector('.alert_winner').textContent = 'Congratulation, ' + document.querySelector('.player' + activePlayer).textContent + 'is Winner !!!'
    document.querySelector('.current-0').textContent = 0
    document.querySelector('.current-1').textContent = 0
    document.querySelector('.btn-hold').style.display = 'None'
    document.querySelector('.btn-roll').style.display = 'None'
    document.querySelector('.btn-new').style.display = 'inline'
    activePlayer === 0 ? activePlayer = 1 : activePlayer=0;
  } else{
    changePlayer()
  }  
  roundScore = 0;
})

document.querySelector('.btn-new').addEventListener('click', init)

function changePlayer(){
  activePlayer === 0 ? activePlayer = 1 : activePlayer=0;
  document.querySelector('.active-player-0').style.display = 'None'
  document.querySelector('.active-player-1').style.display = 'None'
  document.querySelector('.active-player-' + activePlayer).style.display = 'Inline'
}

function init(){  
  roundScore = 0;
  scores = [0,0];
  scores_list = [[],[]]
  document.querySelector('.alert_winner').style.display = 'None'
  document.querySelector('.btn-new').style.display = 'None'
  document.querySelector('.current-0').textContent = 0
  document.querySelector('.current-1').textContent = 0
  document.querySelector('.score-0').textContent = 0
  document.querySelector('.score-1').textContent = 0
  document.getElementById('dice').style.display = 'None'
  document.querySelector('.btn-hold').style.display = 'Inline'
  document.querySelector('.btn-roll').style.display = 'Inline'
  document.querySelector('.active-player-0').style.display = 'None'
  document.querySelector('.active-player-1').style.display = 'None'
  document.querySelector('.active-player-' + activePlayer).style.display = 'Inline'
}



