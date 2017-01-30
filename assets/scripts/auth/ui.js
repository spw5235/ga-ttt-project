'use strict';

// const board = require('../board');

let beginPlay;

const signInSuccess = function() {
  $('#new-game-dummy').remove();
  $('#new-game').show();
  $('#game-board-container').show();
  $('.player-message').text('');
  $(".temp-login-message").text("You have successfully signed in. Start playing");
  $(".player-turn").text("");
};

const signUpSuccess = function() {
  $(".player-message").text("Alert: You have successfully signed up. Please login before starting the game");
  console.log('signup in success');
};

const signOutSuccess = function() {
  $(".player-message").text("Alert: You have successfully signed out.");
  $('.player-message').css('color', 'red');
  $('.temp-login-message').text('');
  $('.player-turn').text('');
  beginPlay = false;
};

const signOutFailure = function() {
  console.log('false to sign out');
};

const getGameSuccess = function() {
  console.log('get game successful');
};

const changePasswordSuccess = () => {
  console.log("Password Successfully Changed.");
};

const updateBoardSucces = () => {
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

const onNewGameSuccess = function() {
  $('.temp-login-message').text('');
  $(".player-turn").text("");
};

const onNewGameFail = function() {
  console.log('onnewgamefail');
};

module.exports = {
  failure,
  success,
  signInSuccess,
  signOutSuccess,
  changePasswordSuccess,
  getGameSuccess,
  getGameFailure,
  updateBoardSucces,
  updateBoardFailed,
  beginPlay,
  signUpSuccess,
  signOutFailure,
  onNewGameFail,
  onNewGameSuccess,
};
