'use strict';

// Message for who's turn it is
const nextPlayerFunc = function(currPlayer, playerX, playerO) {
  if (currPlayer === playerX) {
    return playerO;
  } else {
    return playerX;
  }
};

const messageText = function(nextPlayer) {
  return "Player " + nextPlayer + ", it's your turn";
};

const currPlayerTurn = function(arr, playerX ,playerO) {
	let tempArr = [];
  let currPlayer;
  for (let i = 0; i < arr.length; i++) {
  	if (arr[i] !== "") {
      tempArr.push(arr[i]);
    }
  }
  let tempArrLength = tempArr.length;

  if (tempArrLength % 2 === 0) {
  	currPlayer = playerX;
  } else {
  	currPlayer = playerO;
  }
  return currPlayer;
};


//Changes player after turn
const changePlayer = function (currPlayer, playerX, playerO) {
  if ( currPlayer === playerX ) {
    currPlayer = playerO;
  } else {
    currPlayer = playerX;
  }
};

//Function determines whether to insert X or O
//depending on playerNumber
const symbolValue = function (player, divClassNum, useBoard, tempSymbol, playerX) {
  if (player === playerX) {
    useBoard[divClassNum] = 'x';
    tempSymbol = 'x';
  } else {
    useBoard[divClassNum] = 'o';
    tempSymbol = 'o';
  }
  return tempSymbol;
  // const divClassAndPlay = [divClassNum, tempSymbol];
  // return divClassAndPlay;
};

//determines if cell was already clicked
const isCellEmpty = function (cellNum, gameBoard) {
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

const recordMove = function(divClassNum, gameBoard) {
  if (isCellEmpty( divClassNum, gameBoard ) === true) {
    return true;
  } else {
    return false;
  }
};

const removeText = function(div) {
  let textDiv = $(div);
	$(textDiv).text("");
};


module.exports = {
  // tempSymbol,
  isWinner,
  // gameBoard,
  recordMove,
  removeText,
  changePlayer,
  gameOver,
  isBoardFilled,
  symbolValue,
  messageText,
  isCellEmpty,
  arraysEqual,
  currPlayerTurn,
  nextPlayerFunc,
  };
