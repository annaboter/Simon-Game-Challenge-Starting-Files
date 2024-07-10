var sounds = [
  new Audio('sounds/red.mp3'),
  new Audio('sounds/blue.mp3'),
  new Audio('sounds/green.mp3'),
  new Audio('sounds/yellow.mp3'),
  new Audio('sounds/wrong.mp3')
];

var buttons = document.querySelectorAll('.btn');
var buttonColors = ["red", "blue", "green", "yellow"];
var gameStart = false;
// var gameOver = false;
var gamePattern = [];
var userClickedPattern = [];
// var eventCounter = 0;
var level = 0;

$(document).keypress(function() {
  if (!gameStart) {
    nextSequence();
    gameStart = true;
  }
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio = new Audio('sounds/' + randomChosenColor + '.mp3');
  audio.play();
  level++;
  $("#level-title").text("Level " + level);
};

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
  // console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
});

function playSound(name) {
  $("#" + name).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
};

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
};

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
    }, 200);
    startOver();
  }
};

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  gameStart = false;
};



// document.addEventListener('keydown', function(event) {
//   // startGame();
//   if(eventCounter % 2 === 0) {
//     computerTurn();
//   } else if(eventCounter % 2 !== 0) {
//     userTurn();
//   };
// });

// // function startGame() {
// //   if (gameStart) return;
// //   gameStart = true;
// //   // console.log('Game started');
// // };

// function computerTurn() {
//   document.getElementById("level-title").innerText = "Level " + (1 + gamePattern.length);
//   document.getElementById("turn-title").innerText = "Computer's Turn";
//   var randomNumber = Math.floor(Math.random() * 4);
//   var randomButton = buttons[randomNumber];
//   gamePattern.push(randomButton.id);
//   randomButton.classList.add('pressed');
//   sounds[randomNumber].play();
//   setTimeout(function() {
//     randomButton.classList.remove('pressed');
//   }, 200);
//   eventCounter++;
// };

// function userTurn() {
//   document.getElementById("turn-title").innerText = "Your Turn";
//   buttons.forEach(function(button) {
//     button.addEventListener("click", function() {
//       var userClickedButton = button.id;
//       userClickedPattern.push(userClickedButton);
//       if (userClickedPattern[i] === gamePattern[i]) {
//         userClickedButton.classList.add('pressed');
//         sounds[userClickedButton].play();
//         setTimeout(function() {
//           userClickedButton.classList.remove('pressed');
//         }, 200);
//       } else {
//         gameOver = true;
//         sounds[5].play();
//         document.getElementById("level-title").innerText = "Game Over";
//         document.body.addClassList('game-over');
//         document.getElementById("turn-title").classList.remove('turn-title');
//       }
//     });
//   });
//   eventCounter++;
// };
