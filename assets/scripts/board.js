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

// const jQueryText = function(divString, textString) {
//   $(divString).text(textString);
// };

//Changes player after turn
// const changePlayer = function (currPlayer, playerX, playerO) {
//   if ( currPlayer === playerX ) {
//     currPlayer = playerO;
//   } else {
//     currPlayer = playerX;
//   }
// };

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

//Determines if anyone won after a turn
// const isWinner = function(arr) {
//   let tempArrayX = [];
//   let tempArrayY = [];
//   let winOne = [0, 1, 2];
//   let winTwo = [2, 1, 0];
//   let winThree = [3, 4, 5];
//   let winFour = [5, 4, 3];
//   let winFive = [6, 7, 8];
//   let winSix = [8, 7, 6];
//   let winSeven = [0, 3, 6];
//   let winEight = [6, 3, 0];
//   let winOneB = [1, 4, 7];
//   let winTwoB = [7, 4, 1];
//   let winThreeB = [2, 5, 8];
//   let winFourB = [8, 5, 2];
//   let winFiveB = [0, 4, 8];
//   let winSixB = [8, 4, 0];
//   let winSevenB = [2, 4, 6];
//   let winEightB = [6, 4, 2];
//
//
//
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] === "x") {
//       tempArrayX.push(i);
//     } else if (arr[i] === "o") {
//       tempArrayY.push(i);
//     }
//   }
//
//   let winCompOneX = arraysEqual(tempArrayX, winOne);
//   let winCompTwoX = arraysEqual(tempArrayX, winTwo);
//   let winCompThreeX = arraysEqual(tempArrayX, winThree);
//   let winCompFourX = arraysEqual(tempArrayX, winFour);
//   let winCompFiveX = arraysEqual(tempArrayX, winFive);
//   let winCompSixX = arraysEqual(tempArrayX, winSix);
//   let winCompSevenX = arraysEqual(tempArrayX, winSeven);
//   let winCompEightX = arraysEqual(tempArrayX, winEight);
//
//   let winCompOneXB = arraysEqual(tempArrayX, winOneB);
//   let winCompTwoXB = arraysEqual(tempArrayX, winTwoB);
//   let winCompThreeXB = arraysEqual(tempArrayX, winThreeB);
//   let winCompFourXB = arraysEqual(tempArrayX, winFourB);
//   let winCompFiveXB = arraysEqual(tempArrayX, winFiveB);
//   let winCompSixXB = arraysEqual(tempArrayX, winSixB);
//   let winCompSevenXB = arraysEqual(tempArrayX, winSevenB);
//   let winCompEightXB = arraysEqual(tempArrayX, winEightB);
//
//
//   let winCompOneY = arraysEqual(tempArrayY, winOne);
//   let winCompTwoY = arraysEqual(tempArrayY, winTwo);
//   let winCompThreeY = arraysEqual(tempArrayY, winThree);
//   let winCompFourY = arraysEqual(tempArrayY, winFour);
//   let winCompFiveY = arraysEqual(tempArrayY, winFive);
//   let winCompSixY = arraysEqual(tempArrayY, winSix);
//   let winCompSevenY = arraysEqual(tempArrayY, winSeven);
//   let winCompEightY = arraysEqual(tempArrayY, winEight);
//
//   let winCompOneYB = arraysEqual(tempArrayY, winOneB);
//   let winCompTwoYB = arraysEqual(tempArrayY, winTwoB);
//   let winCompThreeYB = arraysEqual(tempArrayY, winThreeB);
//   let winCompFourYB = arraysEqual(tempArrayY, winFourB);
//   let winCompFiveYB = arraysEqual(tempArrayY, winFiveB);
//   let winCompSixYB = arraysEqual(tempArrayY, winSixB);
//   let winCompSevenYB = arraysEqual(tempArrayY, winSevenB);
//   let winCompEightYB = arraysEqual(tempArrayY, winEightB);
//
//   if (winCompOneX || winCompTwoX || winCompThreeX || winCompFourX || winCompFiveX || winCompSixX || winCompSevenX || winCompEightX || winCompOneY || winCompTwoY || winCompThreeY || winCompFourY || winCompFiveY || winCompSixY || winCompSevenY || winCompEightY || winCompOneXB || winCompTwoXB || winCompThreeXB || winCompFourXB || winCompFiveXB || winCompSixXB || winCompSevenXB || winCompEightXB || winCompOneYB || winCompTwoYB || winCompThreeYB || winCompFourYB || winCompFiveYB || winCompSixYB || winCompSevenYB || winCompEightYB) {
//
//     return true;
//   }
//
//   // let tempArrayX = [];
//   // let tempArrayY = [];
//   // let winOne = [0, 1, 2];
//   // let winTwo = [2, 1, 0];
//
//   // var arr = [1, 2, 3, 4];
//   // var winningArr = [1, 3, 5];
//   //
//   // var found = false;
//   // for (let i = 0; i < winningArr.length; i++) {
//   //     if (arr.indexOf(winningArr[i]) > -1) {
//   //         found = true;
//   //         break;
//   //     }
//   // }
//   // console.log(found);
//
//
// };

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

const showSignOut = function() {
  $('#sign-in').hide();
  $('#sign-up').hide();
  $('#sign-out').toggle();
  $('#change-password').hide();
};

const newGameDummyButton = function() {
  $('.player-turn').text('');
  $('.player-message').text('Alert: Before Starting the Game, you must sign-up and sign-in to your account.  Then, click the "new game" button below the board');
};


$('#new-game-dummy').on('click', newGameDummyButton);
$('.dummy-game-board-container').on('click', newGameDummyButton);
$('#login-b').on('click', showLogin);
$('#sign-up-b').on('click', showSignUp);
$('#change-password-b').on('click', showChangePassword);
$('#sign-up-b').on('sign-out-b', showSignOut);



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


  ///Old Code

  // const store = require('./store');
  // const api = require('./auth/api');
  // const ui = require('./auth/ui');

  // const playerSummary = function () {
  //   if (store.user) {
  //     if (store.user) {
  //       api.getGame()
  //         .then((response) => {
  //           store.gameSummary = response.game.id;
  //           return store.gameSummary;
  //         })
  //         .done(console.log(store.gameSummary))
  //         .fail(ui.fail);
  //     }
  //   } else {
  //     console.log('false');
  //   }
  // };
  //////////////







  /////////// End Revised Function//////////////


  ///////////////////My Old Work///////////////////////

  // $(".game-board-container div").on( "click", function() {
  //     //select clack of clicked
  //     // let testclass = $(".0cell").data("box-num");
  //     // let testclassText = testclass.attr()
  //     // let testattr = $( this ).data("box-num");
  //     // console.log(testattr);
  //     //
  //     // const divClass = $( this ).attr("id");
  //     //
  //     // //convert string to num
  //     // const divClassNum = parseInt(divClass);
  //     //
  //     // const validMove = recordMove(divClassNum);
  //
  //     //checks if cell is empty - if not, text.Error
  //     if (validMove) {
  //       //clear preivous error messages
  //       // $(".player-message").text("");
  //       //determines symbol to display on page and pushes to array
  //       // symbolValue(currPlayer, divClassNum);
  //       // let divClassNumStore = divClassNum;
  //       //display symbol on page
  //       // $( this ).text( tempSymbol );
  //       //test if game over - i.e. tie or win
  //       if (gameOver(gameBoard)) {
  //         //if tie, remove warning text, alert tie
  //         if (isBoardFilled(gameBoard)) {
  //           $(".player-turn").text("");
  //           $(".player-message").text("The game has ended in a draw");
  //         } else if (isWinner(gameBoard)) {
  //           $(".player-turn").text("");
  //           $(".player-message").text("Player " + currPlayer + " has won the game");
  //         }
  //       } else {
  //         changePlayer();
  //         currentPlayTurn = messageText(currPlayer);
  //         $(".player-turn").text(currentPlayTurn);
  //       }
  //     } else {
  //       $(".player-message").text("Error: This box has already been selected.  Please select a different box to continue the game");
  //     }
  //   });

  //
  // $("#reset-game").on( "click", function() {
  //   console.log('reset completed');
  //   clearBoard();
  //   $(".game-box").text('');
  // });
