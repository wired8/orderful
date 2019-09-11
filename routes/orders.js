'use strict';

module.exports = function (router) {
  const orderController = require('../controllers/orderController');
  const axios = require('axios');

  router.route('/order-changes/:id?')
    .get(async function (req, res, next) {
      const id = req.params.id;
      let data = await getData();
      if (id) {
        orderController.getOrderChangesById(id, data.orders, data.orderChanges, function (err, result) {
          return res.json(result);
        });
      } else {
        orderController.getAllOrdersWithChanges(data.orders, data.orderChanges, function (err, result) {
          return res.json(result);
        });
      }
    });

  const getData = async () => {
    try {
      let result = await axios.get('http://files.orderful.com/tech-interview-example.json');
      return result.data;
    } catch (error) {
      console.error(error)
    }
  };
};


