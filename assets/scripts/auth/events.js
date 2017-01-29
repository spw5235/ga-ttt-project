'use strict';

const api = require('./api');
const ui = require('./ui');
const getFormFields = require('../../../lib/get-form-fields');
const store = require('../store');


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
  if (store.user) {
    api.getGame()
      .then((response) => {
        store.games = response.games;
        return store.games;
      })
      .then(ui.getGameSuccess)
      .catch(ui.getGameFailure);
    }
};

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp);
  $('#new-game').on('click', onNewGame);
  // $('.0cell').on('click', onUpdateCurrentGame);
  $('#sign-in').on('submit', onSignIn);
  $('#sign-out').on('submit', onSignOut);
  $('#change-password').on('submit', onChangePassword);
  $('#get-games').on('click', onGetGame);
};

module.exports = {
  addHandlers,
};
