'use strict';

const orders = require('./orders');

module.exports = (router) => {
  orders(router);
  return router;
};