'use strict';

//My Work

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
    .then(ui.signUpSuccess)
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
    .then(ui.signInSuccess)
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



// $("#reset-game").on( "click", function() {
//   console.log('reset completed');
//   clearBoard();
//   $(".game-box").text('');
// });


let currPlayer;
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let tempSymbol;
let nextPlayer;
let currPlayNum;


const onNewGame = function(event) {
  event.preventDefault();
  $('.dummy-game-board-container').remove();
  $('.game-board-container').show();
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  $('.game-board-container').children().text('');
  if (store.user) {
    api.newGame()
      .then((response) => {
        store.curGameId = response.game.id;
        return store.curGameId;
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

let isGameOver = false;

const onGameInitiated = function(event) {
  if (isGameOver !== true) {
    console.log('game is not over');
  } else {
    return;
  }

    event.preventDefault();
    const playerX = 'X';
    const playerO = 'O';
    currPlayer = board.currPlayerTurn(gameBoard, playerX ,playerO);
    currPlayNum = board.currentPlayerVal(currPlayer, playerX);

    const eventTargetId = event.target.id;
    const divClassNum = parseInt(eventTargetId);
    const validMove = board.recordMove(divClassNum, gameBoard);

    if (validMove) {
      //clear preivous error messages
      $(".player-message").text("");
      board.symbolValue(currPlayer, divClassNum, gameBoard, tempSymbol, playerX);

      // game.game.cell.index = board.divClassNum;
      // game.game.cell.value = board.currPlayer;
      //determines symbol to display on page and pushes to array
      //display symbol on page
      $( event.target).text( currPlayer );

        if (board.gameOver(gameBoard)) {
          if (board.isWinner(gameBoard)) {
            $(".player-turn").text("");
            $(".player-message").text("Player " + currPlayNum + " has won the game");
          } else if (board.isBoardFilled(gameBoard)) {
            $(".player-turn").text("");
            $(".player-message").text("The game has ended in a draw");
          }
          isGameOver = true;
      }
      else {
        nextPlayer = board.nextPlayerFunc(currPlayer, playerX, playerO);
        // board.changePlayer(currPlayer, playerX, playerO);
        $(".player-turn").text("Player " + currPlayNum + ", it's your turn");
      }
      console.log(eventTargetId);
      console.log(currPlayer);
      console.log(isGameOver);


      api.updatingBoard(eventTargetId, currPlayer, isGameOver)
        .done(ui.updateBoardSucces)
        .fail(ui.updateBoardFailed);
      // api.getCurrentGame()
      // .then((response) => {
      //   store.displayGameId = response.game.id;
      //   store.displayCells = response.game.cells;
      //   store.displayOver = response.game.over;
      //   $('.score').text(store.displayCells);
      //   console.log(store.displayGameId);
      //   console.log(store.displayCells);
      //   console.log(store.displayOver);
      // })
      // .done(ui.updateBoardSucces)
      // .fail(ui.updateBoardFailed);
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

  $('.game-board-container div').on('click', onGameInitiated);
};

module.exports = {
  addHandlers,
  onGetGame,
};
