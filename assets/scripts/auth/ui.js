'use strict';

// const board = require('../board');

let beginPlay;

const signInSuccess = function() {
  console.log('sign in success');
  $('#login-status').text('Login Status: Signed-In')
  $('#login-status').css('color', 'green');

  $('#new-game-dummy').hide();
  $('#new-game').show();
  $('#game-board-container').show();

  $(".temp-login-message").text("CLICK NEW GAME TO START PLAYING!");
  $(".temp-login-message").css("color", "red");
  $(".player-message").text("");
  $("#sign-in").hide();



};

$(".form-control").text('');

const signUpSuccess = function() {
  $(".player-message").text("Alert: You have successfully signed up. Please login before starting the game");
  $(".player-message").css("color", "yello");
  $("#sign-up").slideUp();
  $("#sign-in").slideDown();
};

const signOutSuccess = function() {
  $(".player-message").text("Alert: You have successfully signed out.");
  $(".dummy-game-board-container").show();
  $(".game-board-container").hide();
  $("#new-game-dummy").show();
  $("#new-game").hide();
  beginPlay = false;
};

const onNewGameSuccess = function() {
  $(".player-message").text("");
  $(".player-turn").text("Player 1, it's your turn");
}

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
};
