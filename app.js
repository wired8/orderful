'use strict';

const axios = require('axios');
//const { assert } = require('chai');

const getData = async () => {
  try {
    return await axios.get('http://files.orderful.com/tech-interview-example.json')
  } catch (error) {
    console.error(error)
  }
};

const processChanges = function(data) {
  for (let i=0; i<data.orderChanges.length; ++i) {
    let orderChange = data.orderChanges[i];
    applyChanges(data.orders, orderChange);
  }
  return data.orders;
};

const applyChanges = function(orders, orderChange) {
  for (let i=0; i<orderChange.changes.length; ++i) {
    let change = orderChange.changes[i];
    applyChange(orders,
      orderChange.ownerId,
      change.orderId,
      change.itemId,
      change.changeType,
      change.changeProperty,
      change.changeValue);
  }
};

const applyChange = function(orders, ownerId, orderId, itemId, type, property, value) {
  let o = orders.filter(x => {
    return x.ownerId === ownerId && x.id === orderId;
  })[0];

  o.items = o.items.map(x => {
    if (x.id === itemId) {
      switch (type) {
        case 'increase':
          x[property] += value;
          break;
        case 'replace':
          x[property] = value;
          break;
      }
    }
    return x;
  });
};


const main = async () => {
  const result = await getData();
  //console.log(JSON.stringify(result.data,null,2));
  console.log( assert(Array.isArray([]), 'empty arrays are arrays') );
  processChanges(result.data);
 // console.log(JSON.stringify(result.data,null,2));

};

main();

