var sounds = [
  new Audio('sounds/green.mp3'),
  new Audio('sounds/red.mp3'),
  new Audio('sounds/yellow.mp3'),
  new Audio('sounds/blue.mp3'),
  new Audio('sounds/wrong.mp3')
];

var buttons = document.querySelectorAll('.btn');
var gameStart = false;
var gameOver = false;
var gamePattern = [];
var userClickedPattern = [];

document.addEventListener('keydown', function() {
  startGame();
  computerTurn();
  userTurn();
});

function startGame() {
  if (gameStart) return;
  gameStart = true;
  // console.log('Game started');
};

function computerTurn() {
  document.getElementById("level-title").innerText = "Level " + (1 + gamePattern.length);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomButton = buttons[randomNumber];
  gamePattern.push(randomButton.id);
  randomButton.classList.add('pressed');
  sounds[randomNumber].play();
  setTimeout(function() {
    randomButton.classList.remove('pressed');
  }, 200);
};

function userTurn() {
  buttons.forEach(function(button) {
    button.addEventListener("click", function() {
      var userClickedButton = button.id;
      userClickedPattern.push(userClickedButton);
      if (userClickedPattern === gamePattern) {
        userClickedButton.classList.add('pressed');
        sounds[userClickedButton].play();
        setTimeout(function() {
          userClickedButton.classList.remove('pressed');
        }, 200);
        gameLoop();
      } else {
        gameOver = true;
        sounds[5].play();
        document.getElementById("level-title").innerText = "Game Over";
        document.body.addClassList('game-over');
      }
    });
  });
};

// after game starts, the user waits for the computer to make a move
// the computer makes a move by randomly selecting a button
// this button then makes the right sound and flashes according to the color
// the button the computer click get added to the gamePattern array
// the user then has to click the same button that the computer clicked
// the user's button click gets added to the userClickedPattern array
// the user's button click gets compared to the computer's button click
// if the user's button click is the same as the computer's button click,
// the button makes the right sound and flashes according to the color
// if the user's button click is different from the computer's button click,
// the button makes the wrong sound and flashes red and the game is over
// this process repeats until the user's button click is different from the computer's button click
