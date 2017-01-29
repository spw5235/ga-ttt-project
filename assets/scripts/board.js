'use strict';

// const api = require('./auth/api');
// const store = require('./store');
// const ui = require('./auth/ui');

let playerX = 'x';
let playerO = 'y';
let currPlayer = playerX;
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let tempSymbol;
let divClassNumStore;

let currentPlayTurn;

//Storing Current Player
const storeCurrPlayer = function() {
  return currPlayer;
};

// Message for who's turn it is
const messageText = function(currPlayer) {
  return "Player " + currPlayer + ", it's your turn";
};

//Changes player after turn
const changePlayer = function () {
  if ( currPlayer === playerX ) {
    currPlayer = playerO;
  } else {
    currPlayer = playerX;
  }
};

//Function determines whether to insert X or O
//depending on playerNumber
const symbolValue = function (player, divClassNum) {
  if (player === playerX) {
    gameBoard[divClassNum] = 'x';
    tempSymbol = 'x';
  } else {
    gameBoard[divClassNum] = 'o';
    tempSymbol = 'o';
  }
  // const divClassAndPlay = [divClassNum, tempSymbol];
  // return divClassAndPlay;
};

const divClassAndPlay = function (divClassNum, tempSymbol) {
  const divClassAndPlayArr = [divClassNum, tempSymbol];
  return divClassAndPlayArr;
};

//determines if cell was already clicked
const isCellEmpty = function (cellNum) {
  if (gameBoard[cellNum] === "") {
    return true;
  } else {
    return false;
  }
};

//states whether the board is filled
const isBoardFilled = function(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "") {
      return false;
    }
  }
  return true;
};

//Arrays Equal to test for isWinner Function
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = arr1.length; i--;) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

//Determines if anyone won after a turn
const isWinner = function(arr) {
  let tempArrayX = [];
  let tempArrayY = [];
  let winOne = [0, 1, 2];
  let winTwo = [2, 5, 8];
  let winThree = [6, 7, 8];
  let winFour = [0, 3, 6];
  let winFive = [0, 4, 8];
  let winSix = [2, 4, 6];
  let winSeven = [1, 4, 7];
  let winEight = [3, 4, 5];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "x") {
      tempArrayX.push(i);
    } else if (arr[i] === "o") {
      tempArrayY.push(i);
    }
  }
  let winCompOneX = arraysEqual(tempArrayX, winOne);
  let winCompTwoX = arraysEqual(tempArrayX, winTwo);
  let winCompThreeX = arraysEqual(tempArrayX, winThree);
  let winCompFourX = arraysEqual(tempArrayX, winFour);
  let winCompFiveX = arraysEqual(tempArrayX, winFive);
  let winCompSixX = arraysEqual(tempArrayX, winSix);
  let winCompSevenX = arraysEqual(tempArrayX, winSeven);
  let winCompEightX = arraysEqual(tempArrayX, winEight);

  let winCompOneY = arraysEqual(tempArrayY, winOne);
  let winCompTwoY = arraysEqual(tempArrayY, winTwo);
  let winCompThreeY = arraysEqual(tempArrayY, winThree);
  let winCompFourY = arraysEqual(tempArrayY, winFour);
  let winCompFiveY = arraysEqual(tempArrayY, winFive);
  let winCompSixY = arraysEqual(tempArrayY, winSix);
  let winCompSevenY = arraysEqual(tempArrayY, winSeven);
  let winCompEightY = arraysEqual(tempArrayY, winEight);

  console.log(tempArrayX);

  if (winCompOneX || winCompTwoX || winCompThreeX || winCompFourX || winCompFiveX || winCompSixX || winCompSevenX || winCompEightX || winCompOneY || winCompTwoY || winCompThreeY || winCompFourY || winCompFiveY || winCompSixY || winCompSevenY || winCompEightY) {

    return true;
  }
};

//Tests to see if the game is over (using isBoardFilled and isWinner)
const gameOver = function (arr) {
  let isBF = isBoardFilled(arr);
  let isW = isWinner(arr);
  if (isBF || isW) {
    return true;
  }
};

//Function nested in jQuery to start over
const clearBoard = function() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currPlayer = playerX;
  tempSymbol = "";
  currentPlayTurn = "";
  console.log('clearboard js');
  messageText();
};


//*******************************jQuery******************//
//Onload Functions for jQuery
$(() => {

//console log index number
$(".game-board-container div").on( "click", function() {
    //select clack of clicked
  	let divClass = $( this ).attr("class");
    //convert string to num
    let divClassNum = parseInt(divClass);
    //checks if cell is empty - if not, text.Error
    if (isCellEmpty( divClassNum ) === true) {
      //clear preivous error messages
      $(".player-message").text("");
      //determines symbol to display on page and pushes to array
      symbolValue(currPlayer, divClassNum);
      // let divClassNumStore = divClassNum;
      //display symbol on page
      $( this ).text( tempSymbol );
      divClassAndPlay();
      //test if game over - i.e. tie or win
      if (gameOver(gameBoard)) {
        //if tie, remove warning text, alert tie
        if (isBoardFilled(gameBoard)) {
          $(".player-turn").text("");
          $(".player-message").text("The game has ended in a draw");
        } else if (isWinner(gameBoard)) {
          $(".player-turn").text("");
          $(".player-message").text("Player " + currPlayer + " has won the game");
        }
      } else {
        changePlayer();
        currentPlayTurn = messageText(currPlayer);
        $(".player-turn").text(currentPlayTurn);
      }
    } else {
      $(".player-message").text("Error: This box has already been selected.  Please select a different box to continue the game");
    }
  });
});

$("#reset-game").on( "click", function() {
  console.log('reset completed');
  clearBoard();
  $(".game-box").text('');
});


module.exports = {
  storeCurrPlayer,
  tempSymbol,
  divClassNumStore,
  divClassAndPlay,
  isWinner,
  gameBoard,
  };
