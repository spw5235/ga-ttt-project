'use strict';

// const board = require('../board');

let beginPlay;

const signInSuccess = function() {
  console.log('sign in success');
  $('#new-game-dummy').remove();
  $('#game-board-container').show();
  $(".player-message").text("You have successfully signed in.  Start playing");
  $(".player-turn").text("Player 1, it's your turn");
};

const signUpSuccess = function() {
  $(".player-message").text("You have successfully signed up.  Please login before starting the game");
  console.log('signup in success');
};

const signOutSuccess = function() {
  console.log('sign out success');
  beginPlay = false;
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
};
