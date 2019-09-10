'use strict';

const axios = require('axios');
const orders = require('./lib/orders');
const jsonDiff = require('diff-json');

const getData = async () => {
  try {
    return await axios.get('http://files.orderful.com/tech-interview-example.json')
  } catch (error) {
    console.error(error)
  }
};

const main = async () => {
  const result = await getData();
  const data = JSON.parse(JSON.stringify(result.data));
  const after = orders.processOrders(data.orders, data.orderChanges);
  console.log('Diff',JSON.stringify(jsonDiff.diff(result.data.orders,after), null, 4));
};

main();

