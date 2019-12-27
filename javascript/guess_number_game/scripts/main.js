let randomNumber = Math.floor(Math.random() * 100) + 1;

const guessField = document.querySelector('.guessField')
const guessSubmit = document.querySelector('.guessSubmit')
const guessPrevious = document.querySelector('.guesses')
const guessLastResult = document.querySelector('.lastResult')
const guessComment = document.querySelector('.lowOrHi')

guessCount = 0

function checkGuess() {
  guessNumber = guessField.value;
  // alert(guessPrevious)
  if (guessCount === 1){
    guessPrevious.textContent = 'Previous guesses: '
  }
  guessPrevious += ' ' + guessCount

  if(guessNumber === randomNumber){
    guessLastResult = 'Congratulation! ' + guessNumber + ' correct.'
    guessComment.textContent = ''
    guessField.textContent = ''
  }
}
