'use strict';

class Orders {

  constructor() {

  };

  processChanges(data) {
    for (let i=0; i<data.orderChanges.length; ++i) {
      let orderChange = data.orderChanges[i];
      this.applyChanges(data.orders, orderChange);
    }
    return data.orders;
  };

  applyChanges(orders, orderChange) {
    for (let i=0; i<orderChange.changes.length; ++i) {
      let change = orderChange.changes[i];
      this.applyChange(orders,
        orderChange.ownerId,
        change.orderId,
        change.itemId,
        change.changeType,
        change.changeProperty,
        change.changeValue);
    }
  };

  applyChange(orders, ownerId, orderId, itemId, type, property, value) {
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

}

module.exports = new Orders();