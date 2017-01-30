'use strict';

const config = require('../config');
const store = require('../store');
// const board = require('../board');

const signUp = function(data){
  return $.ajax({
    url: config.apiOrigin + '/sign-up/',
    method: 'POST',
    data,
  });
};

const signIn = function(data){
  return $.ajax({
    url: config.apiOrigin + '/sign-in/',
    method: 'POST',
    data,
  });
};

const signOut = function(data){
  return $.ajax({
    method: 'DELETE',
    url: config.apiOrigin + '/sign-out/' + store.user.id,
    headers: {
      Authorization: 'Token token=' + store.user.token,
    },
    data,
  });
};

const changePassword = function(data){
  return $.ajax({
    method: 'PATCH',
    url: config.apiOrigin + '/change-password/' + store.user.id,
    headers: {
      Authorization: 'Token token=' + store.user.token,
    },
    data: data,
  });
};

const newGame = function() {
  return $.ajax({
      url: config.apiOrigin + '/games/',
      headers: {
        Authorization: 'Token token=' + store.user.token,
      },
      method: 'POST',
  });
};

const getGame = function () {
  return $.ajax ({
    url: config.apiOrigin + '/games/',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token,
    },
  });
};

const getCurrentGame = function () {
  return $.ajax ({
    url: config.apiOrigin + '/games/' + store.curGameId,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token,
    },
  });
};

const updatingBoard = function (i, v, o) {

  return $.ajax({
    url: config.apiOrigin + '/games/' + store.curGameId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token,
    },
    data: {
      "game": {
        "cell": {
          "index": i,
          "value": v,
          },
        "over": o,
        }
    },
  });
};

module.exports = {
  signUp,
  signIn,
  changePassword,
  newGame,
  getGame,
  updatingBoard,
  getCurrentGame,
  signOut,
};
