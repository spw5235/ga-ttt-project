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
  .catch(ui.failure);
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
  .catch(ui.failure);
};
const onSignOut = function(event) {
	event.preventDefault();
	let data = getFormFields(event.target);
	api.signOut(data)
  .done(ui.signOutSuccess)
  .fail(ui.fail);
};

const onChangePassword = function(event) {
	event.preventDefault();
	let data = getFormFields(event.target);
	api.changePassword(data).done(ui.changePasswordSuccess).fail(ui.fail);
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

  if (validMove) {
    $('#new-game-b').show();
    $('#new-game-b').text('Reset Game');
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
			$(".player-turn").text("Player " + currPlayNum + ", it's your turn");
		}

		// api.updatingBoard(eventTargetId, currPlayer, isGameOver)
    //   .done(ui.updateBoardSuccess)
    //   .fail(ui.updateBoardFailed);
		// onShowLastGame();
	} else {
    $(".temp-login-message").text("");
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
};
module.exports = {
	addHandlers,
	onGetGame,
	// onShowLastGame,
};
