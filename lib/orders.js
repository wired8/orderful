'use strict';

class Orders {

  constructor() {

  };

  processOrders(orders, orderChanges) {
    for (let i=0; i<orderChanges.length; ++i) {
      let orderChange = orderChanges[i];
      this._applyChanges(orders, orderChange);
    }
    return orders;
  };

  _applyChanges(orders, orderChange) {
    for (let i=0; i<orderChange.changes.length; ++i) {
      let change = orderChange.changes[i];
      this._applyChange(orders,
        orderChange.ownerId,
        change.orderId,
        change.itemId,
        change.changeType,
        change.changeProperty,
        change.changeValue);
    }
  };

  _applyChange(orders, ownerId, orderId, itemId, type, property, value) {
    let o = orders.filter(x => {
      return x.ownerId === ownerId && x.id === orderId;
    });

    if (o && o.length) {
      o = o[0];
    }

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

}

module.exports = new Orders();