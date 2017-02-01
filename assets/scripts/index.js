'use strict';

require('./example');
require('./board.js');


const setAPIOrigin = require('../../lib/set-api-origin');
const config = require('./config');
// const board = require('./board');
const authEvents = require('./auth/events.js');


$(() => {
  authEvents.addHandlers();
});

$(() => {
  setAPIOrigin(location, config);
});
