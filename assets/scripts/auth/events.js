'use strict';
const api = require('./api');
const ui = require('./ui');
const getFormFields = require('../../../lib/get-form-fields');
const store = require('../store');
const board = require('../board');


//Blank
let currPlayer;
let gameBoard;
let tempSymbol;
let nextPlayer;
let currPlayNum;
let isGameOver = false;

// const postStats = function() {
//   console.log('fille');
// };

const sortStatsFunction = function (a,b) {
    return a - b;
};

const calcWinnerStats = function(arr) {
  // console.log('calc winner stats arr');
  // console.log(arr);
  let tempArrayX = [];
  let tempArrayY = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "x" || arr[i] === "X") {
      tempArrayX.push(i);
    } else if (arr[i] === "o" || arr[i] === "O") {
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


  tempArrayX = tempArrayX.sort(sortStatsFunction);
  tempArrayX = tempArrayX.join(",");

  tempArrayY = tempArrayY.sort(sortStatsFunction);
  tempArrayY = tempArrayY.join(",");

  // console.log("tempArrayX");
  // console.log(tempArrayX);
  // console.log("tempArrayY");
  // console.log(tempArrayY);

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
      return 1;
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
      return 2;
    } else {
        zeroTrue = false;
        oneTrue = false;
        twoTrue = false;
        thisGameOver = false;
    }
  }
  return 0;
};

const onGetStats = function() {
  api.getStats()
    .then((response) => {
      let win = [];
      let loss = [];
      let tie = [];
      for (let i = 0; i < response.games.length; i++) {
        // console.log('all games');
        // console.log(response.games[i]);
        if ( response.games[i].over === true ) {
          let tempObj = [];

          tempObj.push(response.games[i].cells);
          // console.log('tempObj');
          // console.log(tempObj);
          let lastGame = tempObj[tempObj.length - 1];
          let winnerofGame = calcWinnerStats(lastGame);

          if (winnerofGame === 1) {
            win.push('x');
            // $("#player-one-winner").show();
          } else if (winnerofGame === 2) {
            loss.push('o');
            // $("#player-two-winner").show();
          }
          else {
            tie.push('t');
            // $("#player-tie").show();
          }
        }
      }
      let winRecord = win.length;
      let lossRecord = loss.length;
      let tieRecord = tie.length;

      winRecord = winRecord.toString();
      lossRecord = lossRecord.toString();
      tieRecord = tieRecord.toString();

      console.log('winrecord');
      console.log(winRecord);
      console.log('lossrecord');
      console.log(lossRecord);
      console.log('tierecord');
      console.log(tieRecord);

      $("#player-one-winner").text(winRecord);
      $("#player-two-winner").text(lossRecord);
      $("#player-tie").text(tieRecord);

      $("#player-one-winner").show();
      $("#player-two-winner").show();
      $("#player-tie").show();

    })
    .done(ui.signOutSuccess)
    .fail(ui.onSignOutFailure);
  };

const getPlayerRecord = function() {
  let gameCount = 0;
  api.getGame()
    .then((response) => {
      for (let i = 0; i < response.games.length; i++) {
        if ( response.games[i].over === true ) {
          gameCount = gameCount + 1;
        }
      }
      store.finalGameCount = gameCount;
      $(".score").text("Number of Games Completed: " + store.finalGameCount);
    })
    .then(ui.getGameSuccess)
    .catch(ui.getGameFailure);
  };

const onSignUp = function(event) {
	event.preventDefault();
	let data = getFormFields(event.target);
	api.signUp(data)
  .then(ui.signUpSuccess)
  .catch(ui.onSignUpFailure);
};

const onSignIn = function(event) {
	event.preventDefault();
	let data = getFormFields(event.target);
	api.signIn(data)
  .then((response) => {
		store.user = response.user;
		return store.user;
	})
  .then(ui.signInSuccess)
  .catch(ui.onSignInFailure);
};

const onSignOut = function(event) {
	event.preventDefault();
	let data = getFormFields(event.target);
	api.signOut(data)
  .done(ui.signOutSuccess)
  .fail(ui.onSignOutFailure);
};

const onChangePassword = function(event) {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.changePassword(data)
  .done(ui.onChangePasswordSuccess)
  .fail(ui.onChangePasswordFailure);
};

const onNewGame = function(event) {
  isGameOver = false;
	event.preventDefault();
	// $('.dummy-game-board-container').remove();
	// $('.game-board-container').show();
	gameBoard = ["", "", "", "", "", "", "", "", ""];
	$('.game-board-container').children().text('');
		api.newGame().then((response) => {
			store.curGameId = response.game.id;
      console.log(store.curGameId);
			return store.curGameId;
		})
    .done(ui.onNewGameSuccess)
    .fail(ui.fail);
    getPlayerRecord();
};

const onGetGame = function() {
	// if (store.user) {
	api.getGame()
  .then((response) => {
		store.games = response.games;
    console.log(response.games);
		return store.games;
	})
  .done(ui.getGameSuccess)
  .catch(ui.getGameFailure);
};

const getUpdateIndex = function(index) {
  return index;
};

const getUpdateValue = function(value) {
  return value;
};

const getUpdateOver = function(over) {
  return over;
};

const onUpdatingBoard = function(index, value, over) {
    // let index = getUpdateIndex();
    // let value = getUpdateValue();
    // let over = getUpdateOver();
    api.updatingBoard(index, value, over)
    .then((response) => {
      console.log('current game object');
      console.log(response.game);
      console.log('current game object');
      console.log('current game array');
      console.log(response.game.cells);
      console.log('current game array');
    })
    .done(ui.updateBoardSuccess)
    .fail(ui.updateBoardFailed);
};

const onGameInitiated = function(event) {

  if (isGameOver === true || isGameOver === "true") {
    return;
  }

	event.preventDefault();
	const playerX = 'X';
	const playerO = 'O';
	currPlayer = board.currPlayerTurn(gameBoard, playerX, playerO);
	currPlayNum = board.currentPlayerVal(currPlayer, playerX);
	const eventTargetId = event.target.id;
	const divClassNum = parseInt(eventTargetId);
	const validMove = board.recordMove(divClassNum, gameBoard);
  $(".player-turn").css('color', 'purple');
  if (validMove) {
    $('#new-game-b').show();
    $('#new-game-b').attr('src', 'https://cloud.githubusercontent.com/assets/13546265/22615755/e34b53d2-ea69-11e6-8acb-df17cd32ad0e.png');

    // $('#new-game-b').text('Reset Game');
    board.removeText(".player-message");
		board.symbolValue(currPlayer, divClassNum, gameBoard, tempSymbol, playerX);
		$(event.target).text(currPlayer);

		if (board.gameOver(gameBoard)) {
			if (board.isWinner(gameBoard)) {

        let index = getUpdateIndex(divClassNum);
        let value = getUpdateValue(currPlayer);
        let over = getUpdateOver(true);
        onUpdatingBoard(index, value, over);

        board.removeText(".player-turn");

				$(".player-message").text("Player " + currPlayNum + " has won the game");
			} else if (board.isBoardFilled(gameBoard)) {

        let index = getUpdateIndex(divClassNum);
        let value = getUpdateValue(currPlayer);
        let over = getUpdateOver(true);
        onUpdatingBoard(index, value, over);


        board.removeText(".player-turn");
				$(".player-message").text("The game has ended in a draw");
			}
      console.log(onGetGame());

			isGameOver = true;
      $('#new-game-b').show();
      $('#new-game-b').text('Start New Game');

		} else {

      let index = getUpdateIndex(divClassNum);
      let value = getUpdateValue(currPlayer);
      let over = getUpdateOver(false);

      onUpdatingBoard(index, value, over);
			nextPlayer = board.nextPlayerFunc(currPlayer, playerX, playerO);
      console.log(nextPlayer);
      if (nextPlayer === 'O') {
        nextPlayer = '2';
      } else {
        nextPlayer = '1';
      }
			$(".player-turn").text("Player " + nextPlayer + ", it's your turn");
		}

		// api.updatingBoard(eventTargetId, currPlayer, isGameOver)
    //   .done(ui.updateBoardSuccess)
    //   .fail(ui.updateBoardFailed);
		// onShowLastGame();
	} else {
    $(".temp-login-message").text("");
    $(".player-message").css('color', 'red');
		$(".player-message").text("Error: This box has already been selected.  Please select a different box to continue the game");
	}
};
const addHandlers = () => {
	$('#sign-up').on('submit', onSignUp);
	$('#new-game').on('click', onNewGame);
	$('#sign-in').on('submit', onSignIn);
	$('#sign-out').on('submit', onSignOut);
  $('#sign-out-b').on('click', onSignOut);
	$('#change-password').on('submit', onChangePassword);
	$('.game-board-container div').on('click', onGameInitiated);
  $('#stats-button').on('click', onGetStats);
};
module.exports = {
	addHandlers,
	onGetGame,
	// onShowLastGame,
};
