'use strict';

// const getFormFields = require(`../../../lib/get-form-fields`);
//
// const api = require('./api');
// const ui = require('./ui');
// const game = require('../game');
// const store = require('../store');

const api = require('./api');
const ui = require('./ui');
const getFormFields = require('../../../lib/get-form-fields');
const store = require('../store');
const board = require('../board');

// let currentGameId;
// console.log(currentGameId);

const onSignUp = function (event) {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.signUp(data)
    .then(ui.success)
    .catch(ui.failure);
};

const onSignIn = function (event) {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.signIn(data)
    .then((response) => {
      store.user = response.user;
      return store.user;
    })
    .then(ui.success)
    .catch(ui.failure);

};

const onSignOut = function(event){
  event.preventDefault();
  let data = getFormFields(event.target);
  api.signOut(data)
  .done(ui.signOutSuccess)
  .fail(ui.fail);
};

const onChangePassword = function(event){
  event.preventDefault();
  let data = getFormFields(event.target);
  api.changePassword(data)
  .done(ui.changePasswordSuccess)
  .fail(ui.fail);
};

const onNewGame = function(event) {
  event.preventDefault();
  if (store.user) {
    api.newGame()
      .then((response) => {
        store.curGameId = response.game.id;
        console.log(store.curGameId);
      })
      .done(ui.success)
      .fail(ui.fail);
  }
};

const onGetGame = function(event) {
  event.preventDefault();
  // if (store.user) {
    api.getGame()
      .then((response) => {
        store.games = response.games;
        return store.games;
      })
      .then(ui.getGameSuccess)
      .catch(ui.getGameFailure);
    // }
};

let currPlayer;
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let tempSymbol;
let nextPlayer;

const onGameInitiated = function(event) {
    event.preventDefault();
    const playerX = 'X';
    const playerO = 'O';
    currPlayer = board.currPlayerTurn(gameBoard, playerX ,playerO);
    let isGameOver = false;
    const eventTargetId = event.target.id;
    const divClassNum = parseInt(eventTargetId);
    const validMove = board.recordMove(divClassNum, gameBoard);

    if (validMove) {
      //clear preivous error messages
      $(".player-message").text("");
      board.symbolValue(currPlayer, divClassNum, gameBoard, tempSymbol, playerX);

      //determines symbol to display on page and pushes to array
      //display symbol on page
      $( event.target).text( currPlayer );

        if (board.gameOver(gameBoard)) {
          if (board.isBoardFilled(gameBoard)) {
            $(".player-turn").text("");
            $(".player-message").text("The game has ended in a draw");
          } else if (board.isWinner(gameBoard)) {
            $(".player-turn").text("");
            $(".player-message").text("Player " + currPlayer + " has won the game");
          }
          isGameOver = true;
      }
      else {
        nextPlayer = board.nextPlayerFunc(currPlayer, playerX, playerO);
        // board.changePlayer(currPlayer, playerX, playerO);
        $(".player-turn").text("Player " + nextPlayer + ", it's your turn");
      }
      api.updatingBoard(eventTargetId, currPlayer, isGameOver)
        .done(ui.updateBoardSucces)
        .fail(ui.updateBoardFailed);
      let showResults = api.getGame();
      console.log(showResults)
    } else {
        $(".player-message").text("Error: This box has already been selected.  Please select a different box to continue the game");
      }
      // console.log('getting board');
      // let showGame = api.getGame();
      // console.log(showGame);
  };

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp);
  $('#new-game').on('click', onNewGame);
  $('#sign-in').on('submit', onSignIn);
  $('#sign-out').on('submit', onSignOut);
  $('#change-password').on('submit', onChangePassword);
  $('#get-games').on('click', onGetGame);
  $('.game-board-container div').on('click', onGameInitiated);
};

module.exports = {
  addHandlers,
};
