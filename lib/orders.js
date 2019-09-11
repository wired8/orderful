'use strict';

class Orders {

  constructor(orders, orderChanges) {
    this.orders = orders;
    this.orderChanges = orderChanges;
  };

  processOrders() {
    for (let i=0; i<this.orderChanges.length; ++i) {
      let orderChange = this.orderChanges[i];
      this._applyChanges(this.orders, orderChange);
    }
    return this.orders;
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

module.exports = Orders;