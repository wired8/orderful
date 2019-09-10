'use strict';

const host = 'http://files.orderful.com';
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const orders = require('../lib/orders');
const jsonDiff = require('diff-json');

chai.use(chaiHttp);

describe('Download and parse orders', () => {
  it('should parse orders', (done) => {
    chai.request(host)
      .get('/tech-interview-example.json')
      .end((err, res) => {
        expect(err).be.null;
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a('object', 'blah');
        const before = JSON.parse(JSON.stringify(res.body));
        expect(before.orders[0].items[1].quantity).to.equal(10);
        expect(before.orders[0].items[2].quantity).to.equal(200);

        const after = orders.processOrders(before.orders, before.orderChanges);
        expect(before.orders.length).to.equal(after.length);
        expect(after[0].items[1].quantity).to.equal(20);
        expect(after[0].items[2].quantity).to.equal(1);

        console.log('Diff',JSON.stringify(jsonDiff.diff(res.body.orders,after), null, 4));
        return done(err);
      });
  });

});