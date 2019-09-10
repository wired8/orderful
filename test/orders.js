'use strict';

const host = 'http://files.orderful.com';
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const orders = require('../lib/orders');

chai.use(chaiHttp);

describe('Download and parse orders', () => {
  let token;

  it('should parse orders', (done) => {
    chai.request(host)
      .get('/tech-interview-example.json')
      .end((err, res) => {
        expect(err).be.null;
        expect(res.body).to.be.a('object');
        //console.log(JSON.stringify(res.body,null,2));
        let data = res.body;
        console.log(JSON.stringify(orders.processChanges(data),null,2));
        expect(res.statusCode).to.equal(200);
        return done(err);
      });
  });

});