'use strict';

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

////Other Work
// 'use strict';
//
// const getFormFields = require(`../../../lib/get-form-fields`);
// const store = require('../store');
// const api = require('../api');
// const ui = require('./ui');
//
// const handleSignUp = function (event) {
//   event.preventDefault();
//
//   const formData = getFormFields(event.target);
//
//   api.signUp(formData)
//     .then(ui.signUpSucess)
//     .catch(ui.onError);
// };
//
// const handleSignIn = function (event) {
//   event.preventDefault();
//
//   const formData = getFormFields(event.target);
//
//   api.signIn(formData)
//     .then((response) => {
//       store.user = response.user;
//       console.log(store);
//       return store.user;
//     })
//     .then(ui.signInSucess)
//     .catch(ui.onError);
// };
//
// const handleSignOut = function () {
//   event.preventDefault();
//
//   api.signOut()
//     .then(ui.signOutSucess)
//     .catch(ui.onError);
// };
//
// const passwordReset = function (event) {
//   event.preventDefault();
//
//   const formData = getFormFields(event.target);
//
//   api.changePassword(formData)
//     .then(ui.passwordResetSucess)
//     .catch(ui.onError);
// };
//
// const onFormSubmit = function (event) {
//
//   const formType = this.id;
//
//   switch (formType) {
//     case 'sign-up':
//       handleSignUp(event);
//       break;
//     case 'sign-in':
//       handleSignIn(event);
//       break;
//     case 'change-password':
//       passwordReset(event);
//       break;
//     default:
//       console.log('default action');
//   }
// };
//
// module.exports = {
//   handleSignOut,
//   onFormSubmit,
// };


//OTHER Work
// 'use strict';
//
// const getFormFields = require(`../../../lib/get-form-fields`);
//
// const api = require('./api');
// const ui = require('./ui');
// const game = require('../game');
// const store = require('../store');
//
// const onSignUp = function (event) {
//     event.preventDefault();
//
//   let data = getFormFields(event.target);
//
//   api.signUp(data)
//     .then(ui.success)
//     .catch(ui.failure);
//
// };
// const onSignIn = function (event) {
//     event.preventDefault();
//
//   let data = getFormFields(event.target);
//
//   api.signIn(data)
//     .then((response) => {
//       store.user = response.user;
//       return store.user;
//     })
//     .then(ui.success)
//     .catch(ui.failure);
//
// };
// const onChangePassword = function (event) {
//   event.preventDefault();
//
//   let data = getFormFields(event.target);
//
//   api.changePassword(data)
//     .then(ui.success)
//     .catch(ui.failure)
//     ;
// };
// const onSignOut = function (event) {
//   event.preventDefault();
//
//   api.signOut()
//     .then(() => {
//       delete store.user;
//       return store;
//     })
//     .then(ui.success)
//     .catch(ui.failure)
//     ;
// };
//
// // shit i dont undertand
// const onGetGame = function (event) {
//   event.preventDefault();
//
//   api.game()
//
//     .then(ui.success)
//     .catch(ui.failure)
//     ;
// };
//
// // const onPatchGame = function (event) {
// //   event.preventDefault();
// //   api.patchGame(store.game.id, event.target.id, game.currentPlayer, game.checkWins())
// //   .then(ui.success)
// //   .catch(ui.failure);
// // };
//
// const onCreateGame = function (event) {
//   event.preventDefault();
// let gameData = getFormFields(event.target);
//   api.createGame(gameData)
//     .then((response) => {
//       store.game = response.game;
//     })
//     .then(ui.success)
//     .catch(ui.failure)
//     ;
// };
// // const gameUpdate = function (event) {
// //   event.preventDefault();
// //   api.createGame()
// //
// //     .then(ui.success)
// //     .catch(ui.failure)
// //     ;
// // };
// // const gameUpdate2 = function(event){
// //   event.preventDefault();
// //   console.log('hi');
// //   api.gameUpdate(event.target.id, game.currentPlayer, game.endGame)
// //     .then(ui.success)
// //     .catch(ui.failure);
// // };
//
//
// const addHandlers = () => {
//   $('#sign-up').on('submit', onSignUp);
//   $('#sign-in').on('submit', onSignIn);
//   $('#change-password').on('submit', onChangePassword);
//   $('#sign-out').on('submit', onSignOut);
//   $('#getGame').on('click', onGetGame);
//   $('#reset').on('click', onCreateGame);
//   // $('.box').on('click', onPatchGame);
//   // $('.cg').on('click', gameUpdate2);
//
// };
// module.exports = {
//   addHandlers,
// };
