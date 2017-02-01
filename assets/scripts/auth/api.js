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

const signOut = function(){
  return $.ajax({
    method: 'DELETE',
    url: config.apiOrigin + '/sign-out/' + store.user.id,
    headers: {
      Authorization: 'Token token=' + store.user.token,
    },
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

const updatingBoard = function (index, value, over) {
  return $.ajax({
    url: config.apiOrigin + '/games/' + store.curGameId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token,
    },
    data: {
      "game": {
        "cell": {
          "index": index,
          "value": value,
          },
        "over": over,
        }
    },
  });
};

module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword,
  newGame,
  getGame,
  updatingBoard,
  getCurrentGame,
};
