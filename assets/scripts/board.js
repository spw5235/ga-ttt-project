'use strict';

// Message for who's turn it is
const nextPlayerFunc = function(currPlayer, playerX, playerO) {
  if (currPlayer === playerX) {
    return playerO;
  } else {
    return playerX;
  }
};

const currentPlayerVal = function(currPlayer, playerX) {
  if ( currPlayer === playerX) {
    return 1;
  } else {
    return 2;
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

const sortFunction = function (a,b) {
    return a - b;
};

const isWinner = function(arr) {
  let tempArrayX = [];
  let tempArrayY = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "x") {
      tempArrayX.push(i);
    } else if (arr[i] === "o") {
      tempArrayY.push(i);
    }
  }

  let winOne = [0, 1, 2];

  let winThree = [3, 4, 5];

  let winFive = [6, 7, 8];

  let winSeven = [0, 3, 6];

  let winOneB = [1, 4, 7];

  let winThreeB = [2, 5, 8];

  let winFiveB = [0, 4, 8];

  let winSevenB = [2, 4, 6];

  let combineArr = [];

  combineArr.push(winOne);

  combineArr.push(winThree);

  combineArr.push(winFive);

  combineArr.push(winSeven);


  combineArr.push(winOneB);

  combineArr.push(winThreeB);

  combineArr.push(winFiveB);

  combineArr.push(winSevenB);


  tempArrayX = tempArrayX.sort(sortFunction);
  tempArrayX = tempArrayX.join(",");

  tempArrayY = tempArrayY.sort(sortFunction);
  tempArrayY = tempArrayY.join(",");

  for (let i = 0; i < combineArr.length; i++) {
  	let zeroTrue = false;
    let oneTrue = false;
    let twoTrue = false;
    let thisGameOver = false;
  	let valueZero = combineArr[i][0].toString();
    let valueOne = combineArr[i][1].toString();
    let valueTwo = combineArr[i][2].toString();

  	for (let j = 0; j < tempArrayX.length; j++) {
    	if (tempArrayX[j] === valueZero) {
      	zeroTrue = true;
        //console.log('if conditional - valueZero');
        //console.log(zeroTrue)
      } else if (tempArrayX[j] === valueOne) {
      	oneTrue = true;
        //console.log('if conditional - valone')
        //console.log(oneTrue)
      } else if (tempArrayX[j] === valueTwo) {
      	//console.log('if conditional - valTwo')
      	twoTrue = true;
      }
    }

    if ( zeroTrue && oneTrue && twoTrue) {
      thisGameOver = true;
      //console.log('this game over');
      return true;
    } else {
        zeroTrue = false;
        oneTrue = false;
        twoTrue = false;
        thisGameOver = false;
    }
  }

  for (let i = 0; i < combineArr.length; i++) {
  	let zeroTrue = false;
    let oneTrue = false;
    let twoTrue = false;
    let thisGameOver = false;
  	let valueZero = combineArr[i][0].toString();
    let valueOne = combineArr[i][1].toString();
    let valueTwo = combineArr[i][2].toString();

  	for (let j = 0; j < tempArrayY.length; j++) {
    	if (tempArrayY[j] === valueZero) {
      	zeroTrue = true;
        //console.log('if conditional - valueZero');
        //console.log(zeroTrue)
      } else if (tempArrayY[j] === valueOne) {
      	oneTrue = true;
        //console.log('if conditional - valone')
        //console.log(oneTrue)
      } else if (tempArrayY[j] === valueTwo) {
      	//console.log('if conditional - valTwo')
      	twoTrue = true;
      }
    }

    if ( zeroTrue && oneTrue && twoTrue) {
      thisGameOver = true;
      return true;
    } else {
        zeroTrue = false;
        oneTrue = false;
        twoTrue = false;
        thisGameOver = false;
    }
  }

  return false;
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

const removeText = function(divString) {
  let textDiv = $(divString);
	textDiv.text("");
};

////CSS Related jQuery

const showLogin = function() {
  $('#sign-in').toggle();
  $('#sign-up').hide();
  $('#sign-out').hide();
  $('#change-password').hide();
};

const showSignUp = function() {
  $('#sign-in').hide();
  $('#sign-up').toggle();
  $('#sign-out').hide();
  $('#change-password').hide();
};

const showChangePassword = function() {
  $('#sign-in').hide();
  $('#sign-up').hide();
  $('#sign-out').hide();
  $('#change-password').toggle();
};

// const showSignOut = function() {
//   $('#sign-in').hide();
//   $('#sign-up').hide();
//   $('#sign-out').toggle();
//   $('#change-password').hide();
// };

const newGameDummyButton = function() {
  $('.player-turn').text('');
  $('.player-message').css('color', 'red');
  $('.player-message').text('Alert: Before Starting the Game, you must sign-up and/or sign-in to your account.');
  $('.dummy-game-board-container').hide();
};


$('#new-game-dummy').on('click', newGameDummyButton);
$('.dummy-game-board-container').on('click', newGameDummyButton);
$('#login-b').on('click', showLogin);
$('#sign-up-b').on('click', showSignUp);
$('#change-password-b').on('click', showChangePassword);


module.exports = {
  isWinner,
  removeText,
  recordMove,
  gameOver,
  isBoardFilled,
  symbolValue,
  messageText,
  isCellEmpty,
  arraysEqual,
  currPlayerTurn,
  nextPlayerFunc,
  currentPlayerVal,
};
