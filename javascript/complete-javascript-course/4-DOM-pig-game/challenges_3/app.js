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

let scores, score_list, activePlayer, roundScore, dice;
let limitation;

element_limitation = document.querySelector('.limitation')

activePlayer = 1

init()

element_limitation.addEventListener('input', function () {  
  if(!element_limitation.validity.patternMismatch & 
    element_limitation.value !== ''){
      element_limitation.reportValidity()
      element_limitation.setCustomValidity('')
    }
})

document.querySelector('#btn-start').addEventListener('click', function () {
  element_limitation.reportValidity()  
  if(element_limitation.validity.patternMismatch | element_limitation.value === '') {    
    element_limitation.setCustomValidity('Please Input Positive Number')
  } else {
    limitation = element_limitation.value 
    document.querySelector('.betting-title').textContent = 'GOAL: ' + limitation;
    document.querySelector('.limitation').style.display = 'none'
    document.querySelector('#btn-start').style.display = 'none'
    document.querySelector('.btn-hold').style.display = 'Inline'
    document.querySelector('.btn-roll').style.display = 'Inline'
  }
})

document.querySelector('.btn-roll').addEventListener('click', function () {
  dice_1 = Math.floor(Math.random() * 6) + 1;
  dice_2 = Math.floor(Math.random() * 6) + 1;
  document.querySelector('#dice-0').style.display = 'inline';
  document.querySelector('#dice-1').style.display = 'inline';
  document.querySelector('#dice-0').src = "/javascript/complete-javascript-course/4-DOM-pig-game/challenges_3/images/dice-" + dice_1 + ".png";
  document.querySelector('#dice-1').src = "/javascript/complete-javascript-course/4-DOM-pig-game/challenges_3/images/dice-" + dice_2 + ".png";
  is_exist_6_face = ((dice_1 === 6 & score_list[activePlayer].indexOf(dice_1) > -1) | 
    (dice_1 === 6 & score_list[activePlayer].indexOf(dice_1) > -1))

  // check if 6 exist or not
  if(is_exist_6_face | (dice_1 === 1 | dice_2 === 1)){
    score_list[activePlayer] = []
    document.querySelector('.current-' + activePlayer).textContent = 0
    roundScore = 0
    changePlayer()
  } else{
    score_list[activePlayer].push(dice_1)
    score_list[activePlayer].push(dice_2)
    roundScore += (dice_1 + dice_2)
    document.querySelector('.current-' + activePlayer).textContent = roundScore
  }
})

document.querySelector('.btn-hold').addEventListener('click', function () {
  scores[activePlayer] += roundScore
  document.querySelector('.score-' + activePlayer).textContent = scores[activePlayer]
  document.querySelector('.current-' + activePlayer).textContent = 0
  roundScore = 0
  score_list[activePlayer] = []

  //check win
  if(scores[activePlayer] >= limitation){
    document.querySelector('.betting-title').textContent = 
    document.querySelector('.player-' + activePlayer).textContent + " is Winner !!!"
    document.querySelector('.btn-hold').style.display = 'none'
    document.querySelector('.btn-roll').style.display = 'none'
    document.querySelector('.btn-new').style.display = 'inline'
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  } else {
    changePlayer()
  }  
})

document.querySelector('.btn-new').addEventListener('click', init)

function  changePlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  document.querySelector('.player-0').classList.toggle('active')
  document.querySelector('.player-1').classList.toggle('active')
}

function init() {
  roundScore = 0
  scores = [0,0]
  score_list = [[],[]]
  limitation = 0
  // alter section
  document.querySelector('.alert-winner').textContent = "PIG GAME 2020"
  
  // info section
  document.querySelector('.btn-new').style.display = 'None'
  document.querySelector('.current-0').textContent = 0
  document.querySelector('.current-1').textContent = 0
  document.querySelector('.score-0').textContent = 0
  document.querySelector('.score-1').textContent = 0
  document.querySelector('#dice-0').style.display = 'None'
  document.querySelector('#dice-1').style.display = 'None'   
  
  // playing section
  document.querySelector('.btn-hold').style.display = 'none'
  document.querySelector('.btn-roll').style.display = 'none'
  document.querySelector('.player-0').classList.remove('active')
  document.querySelector('.player-1').classList.remove('active')
  document.querySelector('.player-' + activePlayer).classList.add('active')

  // betting section
  document.querySelector('.betting-title').textContent = 'BETTING';
  document.querySelector('.limitation').style.display = 'inline'
  document.getElementById('btn-start').style.display = 'inline'
}

