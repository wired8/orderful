'use strict';

const Orders = require('../lib/orders');

exports.getOrderChangesById = function(id, orders, orderChanges, callback) {
  let orderHandler = new Orders(orders, orderChanges);
  let result = orderHandler.processOrders();

  let ids = orderChanges.filter(x => {
    return id == x.id;
  });
  let changedOrders = [];
  if (ids.length) {
    changedOrders = result.filter(x => {
      if (id == x.id) {
        return x;
      } else {
        return false;
      }
    });
  }
  return callback(null, changedOrders);
};

exports.getAllOrdersWithChanges = function(orders, orderChanges, callback) {
  let orderHandler = new Orders(orders, orderChanges);
  let result = orderHandler.processOrders();
  let ids = orderChanges.map(x => {
    return x.id;
  });
  let changedOrders = result.filter(x => {
    if (ids.indexOf(x.id) > -1) {
      return x;
    } else {
      return false;
    }
  });
  return callback(null, changedOrders);
};



