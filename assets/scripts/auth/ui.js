'use strict';

// const board = require('../board');

let beginPlay;

// const = function() {
//
// }


/////////////////////////
//////////////////////////SUCCESSES
/////////////////////////

const signInSuccess = function() {
  console.log('sign in success');
  $('#new-game-b').text('Start New Game');
  $('#change-password-b').show();
  $('#new-game').show();
  $('#new-game-b').show();
  $("#sign-in").hide();
  $("#login-b").hide();
  $("#sign-up-b").hide();
  $(".dummy-game-board-container").hide();
  $(".player-message").css("color", "green");
  $("#sign-up-success").hide();
  $("#sign-out-b").show();
  $("#sign-in-success").show();
  $("#start-game-warning").hide();
  $(".player-message").text('Click "Start New Game" to play!')
};

const signOutSuccess = function() {
  $('.dummy-game-board-container').show();
  $('.player-turn').text('Alert: Please sign-up or sign-in to start playing')
  $('.player-message').text('');
  $('#new-game').hide();
  $("#login-b").show();
  $("#sign-up-b").show();
  $(".game-board-container").hide();
  $(".form").hide();
  $(".score").text("");
  $('#change-password-b').hide();
  $('#sign-out-success').show();
  $('#sign-in-success').hide();
  beginPlay = false;
};

const onNewGameSuccess = function() {
  $('#new-game-b').hide();
  $(".player-message").text("");
  $('.player-turn').text("Player 1, it's your turn");
  $(".player-turn").show();
  $(".game-board-container").hide();
  $(".game-board-container").show();
  $("#sign-in-success").hide();
};

const signUpSuccess = function() {
  $(".player-turn").text("");
  $(".player-message").text("Alert: You have successfully signed up. Please login before starting the game");
  $(".player-message").css("color", "yello");
  $("#sign-up").slideUp();
  $("#sign-in").slideDown();
  $("#sign-up-success").show();
};

const onChangePasswordSuccess = function() {
  $('player-message').css('color', 'green')
  $('#new-game').hide();
  $("#login-b").show();
  $("#sign-up-b").show();
  $(".game-board-container").hide();
  $(".form").hide();
  $(".player-message").text("Alert: You have successfully signed out.");
  $(".player-turn").text("");
  $(".score").text("");
  $('#change-password-b').hide();
  beginPlay = false;
};

/////////////////////////
//////////////////////////FAILURES
/////////////////////////

const onChangePasswordFailure = function() {
  $("#change-password-warning").show();
}

const onSignInFailure = function() {
  $("#sign-in-warning").show();
};

const onSignOutFailure = function() {
  $("#sign-out-warning").show();
};

const onSignUpFailure = function() {
  $("#sign-up-warning").show();
}

/////////////////////////
//////////////////////////OTHER
/////////////////////////
const getGameSuccess = function() {
  console.log('get game successful');
};

const changePasswordSuccess = () => {
  console.log("Password Successfully Changed.");
};

const updateBoardSuccess = () => {
  console.log("Board Successfully Changed.");
};

const updateBoardFailed = () => {
  console.log("Board Update Failed.");
};

const getGameFailure = function() {
  console.log('Failure in getting game');
};

const success = (data) => {
  console.log('success completed');
  console.log(data);
};

const failure = (error) => {
  console.error(error);
};

module.exports = {
  failure,
  success,
  signInSuccess,
  signOutSuccess,
  changePasswordSuccess,
  getGameSuccess,
  getGameFailure,
  updateBoardSuccess,
  updateBoardFailed,
  beginPlay,
  signUpSuccess,
  onNewGameSuccess,
  onChangePasswordSuccess,
  onChangePasswordFailure,
  onSignInFailure,
  onSignOutFailure,
  onSignUpFailure,
};
