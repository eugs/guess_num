var button = document.getElementById("btn");
var logField = document.getElementById("log");
var inputField = document.getElementById("txt_field");
var counterField = document.getElementById("tries_num");

var updateCounter;
var hiddenNum;
var triesMessage, hintMessage;
const MAX_TRIES = 10;

button.onclick = function() {
  mainLoop();
  inputField.value = "";
};

reset();

function mainLoop() {
  try {
    checkInput(inputField.value);
    compareGuess(inputField.value);

    if(inputField.value != hiddenNum) {
        if(hasMoreTries()) {
          renderMessages();
        } else {
          gameOver();
        }
        //WON
      } else {
        alert("You guess the num! "+hiddenNum);
        reset();
      }

  } catch(e) {
    alert("error: " + e);
  }
}

function reset() {
  updateCounter = function() {
    var triesCounter = 0;
      return function () {
        return ++triesCounter;
      }
    }();

    counterField.innerHTML = MAX_TRIES;
    logField.innerHTML = "";
    inputField.value = "";
    triesMessage = 0;
    hintMessage = "";

    //roll the number
    hiddenNum = 1 + Math.floor(Math.random() * 100);
    console.log("hidden number: " + hiddenNum);
}

function renderMessages() {
  logField.innerHTML += "<p>"+hintMessage+"</p>";
}

function gameOver() {
  alert("game over, the number was: "+hiddenNum);
  reset();
}

function hasMoreTries() {
  var left = MAX_TRIES - updateCounter();
  counterField.innerHTML = left;
  triesMessage = "you have: " + left + "tries left";
  return (left > 0);
}

function compareGuess(val) {
  if (hiddenNum > val) {
    hintMessage = "My num is bigger, than " + val;
  } else if (hiddenNum < val) {
    hintMessage = "My num is less, than " + val;
  }
}

function checkInput(inputStr) {
  console.log("check: " + inputStr);
  var i = inputStr.length;
  if(i <= 0) throw "Empty field";

  while(i--) {
    var symbol = inputStr[i];
    if(isNaN(parseInt(symbol))) {
      throw "Not a number: "+symbol;
    }
  }
}
