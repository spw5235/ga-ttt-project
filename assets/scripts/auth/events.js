//My Work

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
  let data = getFormFields(event.target);
  api.newGame(data)
    .done(ui.success)
    .fail(ui.fail);
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

const gameInitiated = function(event) {
    const playerX = 'X';
    const playerO = 'O';
    currPlayer = board.currPlayerTurn(gameBoard, playerX ,playerO);
    event.preventDefault();
    // const playerX = 'x';
    // const playerO = 'o';
    // let currPlayer = playerX;
    // let gameBoard = ["", "", "", "", "", "", "", "", ""];
    // let tempSymbol;
    // let currentPlayTurn;

    const divClassNum = parseInt(event.target.id);
    const validMove = board.recordMove(divClassNum, gameBoard);

    if (validMove) {
      //clear preivous error messages
      $(".player-message").text("");
      const displayVal = board.symbolValue(currPlayer, divClassNum, gameBoard, tempSymbol, playerX);

      // game.game.cell.index = board.divClassNum;
      // game.game.cell.value = board.currPlayer;
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
      }
      else {
        nextPlayer = board.nextPlayerFunc(currPlayer, playerX, playerO);
        console.log(nextPlayer);
        // board.changePlayer(currPlayer, playerX, playerO);
        $(".player-turn").text("Player " + nextPlayer + ", it's your turn");
      }
    } else {
        $(".player-message").text("Error: This box has already been selected.  Please select a different box to continue the game");
      }
    // api.updateBoard(game);
  };

//if broken insert data for function param
// const onUpdatingBoard = function(event) {
//   // event.preventDefault();
//   let data-attr = $( this ).data("box-num");
//
//   let data = getFormFields(event.target);
//   // if (store.user) {
//     api.getGame()
//       .then((response) => {
//         store.games = response.games;
//         return store.games;
//       })
//       .then(ui.getGameSuccess)
//       .catch(ui.getGameFailure);
//     // }
// };

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp);
  $('#new-game').on('click', onNewGame);
  // $('.0cell').on('click', onUpdateCurrentGame);
  $('#sign-in').on('submit', onSignIn);
  $('#sign-out').on('submit', onSignOut);
  $('#change-password').on('submit', onChangePassword);
  $('#get-games').on('click', onGetGame);
  $('.game-board-container div').on('click', gameInitiated);
};

module.exports = {
  addHandlers,
};
