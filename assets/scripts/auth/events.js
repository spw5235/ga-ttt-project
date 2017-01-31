'use strict';

//My Work

const api = require('./api');
const ui = require('./ui');
const getFormFields = require('../../../lib/get-form-fields');
const store = require('../store');
const board = require('../board');
let isGameOver = false;

$('#sign-up').hide();
// let currentGameId;
// console.log(currentGameId);

const onDisplayLastOver = function() {
  console.log("onShowLastGame");
  api.getGame()
    .then((response) => {
      let arrLength = (response.games.length) - 1;
      let newVal = response.games[arrLength];
      console.log(newVal);
      store.lastGameOver = newVal;
  });
  if (store.lastGameOver === false || store.lastGameOver) {

    console.log('store condition');
    $(".score").text("Status of last game last game: Unfinished");
  } else {
    $(".score").text("Status of last game last game: Completed");
  }
};

// const onShowLastGame = function() {
//   // if (store.user) {
//     api.getGame()
//       .then((response) => {
//         for (let i = 0; i < response.games.length; i++) {
//           let gameHistory = [];
//           gameHistory.push(response.games[i]);
//           store.gameHist = gameHistory;
//           console.log(store.gameHist);
//           return store.gameHist;
//         }
//         for (let j = 0; j < store.gameHistory.length; j++) {
//           let temp = [];
//           temp.push(store.gameHistory[j]);
//           store.temp = temp;
//           console.log(store.temp);
//           return store.temp;
//         }
//       })
//       .then(ui.getGameSuccess)
//       .catch(ui.getGameFailure);
//     // }
// };

// const printArray = function() {
//   onShowLastGame();
//   for (let j = 0; j < store.gameHistory.length; j++) {
//     let temp = [];
//     temp.push(store.gameHistory[j]);
//     store.temp = temp;
//     console.log(store.temp);
//     return store.temp;
//   }
//   console.log(store.temp);
// };

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
    $('#sign-in').slideUp();
    $('.temp-login-message').css('color', 'green');
};

const onSignOut = function(event){
  event.preventDefault();
  let data = getFormFields(event.target);
  api.signOut(data)
  .done(ui.signOutSuccess)
  .fail(ui.signOutFailure);
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
        console.log(store.curGameId);
        return store.curGameId;
      })
      .done(ui.onNewGameSuccess)
      .fail(ui.onNewGameFail);
  }

  isGameOver = false;
};

///Old new Game Constant
// const onNewGame = function(event) {
//   event.preventDefault();
//   $('.dummy-game-board-container').remove();
//   $('.game-board-container').show();
//   gameBoard = ["", "", "", "", "", "", "", "", ""];
//   $('.game-board-container').children().text('');
//   if (store.user) {
//     api.newGame()
//       .then((response) => {
//         store.curGameId = response.game.id;
//         return store.curGameId;
//       })
//       .done(ui.onNewGameSuccess)
//       .fail(ui.onNewGameFail);
//   }
//
//   isGameOver = false;
// };

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

          ///Changes name of new game button
          $('#new-game-b').text("Play Again");

          //Prevents game from continuing
          isGameOver = true;
      } else {
        nextPlayer = board.nextPlayerFunc(currPlayer, playerX, playerO);
        // board.changePlayer(currPlayer, playerX, playerO);
        $(".player-turn").text("Player " + currPlayNum + ", it's your turn");
      }

      api.updatingBoard(eventTargetId, currPlayer, isGameOver)
        .done(ui.updateBoardSucces)
        .fail(ui.updateBoardFailed);
      onDisplayLastOver();

      // onShowLastGame();
      // let test = onShowLastGame();
      // console.log(test[0][0]);
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
  $('#sign-out').on('submit', onSignOut);
  $('#new-game').on('click', onNewGame);
  $('#sign-out-b').on('click', onSignOut);

  $('#sign-in').on('submit', onSignIn);
  $('#change-password').on('submit', onChangePassword);

  $('.game-board-container div').on('click', onGameInitiated);
};

module.exports = {
  addHandlers,
  onGetGame,
  // onShowLastGame,
};
