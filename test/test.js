var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('Notes', function () {
  it('should list ALL notes GET', function (done) {
    chai.request('http://127.0.0.1:3000')
      .get('/notes')
      .end(function (err, res) {
        res.should.have.status(200);
        done();
      })
  })
});

it('should add a SINGLE note POST', function (done) {
  chai.request('http://127.0.0.1:3000')
    .post('/notes')
    .send({ 'title': 'nodejs', 'description': 'awesome' })
    .end(function (err, res) {
      console.log(res.body);
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      // res.body.should.have.property('title');
      // res.body.should.have.property('description');
      res.body.should.have.property('_id');
      // res.body.title.should.equal('nodejs');
      // res.body.description.should.equal('description');
      done();
    });
});
