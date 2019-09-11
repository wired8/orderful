'use strict';

const host = 'http://files.orderful.com';
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const orders = require('../lib/orders');
const jsonDiff = require('diff-json');
const server = require('../app');

chai.use(chaiHttp);

describe('Download and parse orders', () => {
  it('should get all order changes', (done) => {
    chai.request(server)
      .get('/order-changes')
      .end((err, res) => {
        expect(err).be.null;
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a('array');
        const result = JSON.parse(JSON.stringify(res.body));
        expect(result[0].items[1].quantity).to.equal(20);
        expect(result[0].items[2].quantity).to.equal(1);
        return done(err);
      });
  });
  it('should get all order changes with id 1', (done) => {
    chai.request(server)
      .get('/order-changes/1')
      .end((err, res) => {
        expect(err).be.null;
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a('array');
        const result = JSON.parse(JSON.stringify(res.body));
        expect(result[0].items[1].quantity).to.equal(20);
        expect(result[0].items[2].quantity).to.equal(1);
        return done(err);
      });
  });
  it('should get all order changes with id 2', (done) => {
    chai.request(server)
      .get('/order-changes/2')
      .end((err, res) => {
        expect(err).be.null;
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a('array');
        const result = JSON.parse(JSON.stringify(res.body));
        expect(result.length).to.equal(0);
        return done(err);
      });
  });

});