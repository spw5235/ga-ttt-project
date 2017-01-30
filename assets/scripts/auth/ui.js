'use strict';


const signInSuccess = function() {
  console.log('sign in success');
};

const signOutSuccess = function() {
  console.log('sign out success');
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
};
