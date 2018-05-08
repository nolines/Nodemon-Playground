var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

//TODO: Need to clear db beforeach method

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
      res.body.SUCCESS.should.be.a('object');
      res.body.SUCCESS.should.have.property('title');
      res.body.SUCCESS.should.have.property('description');
      res.body.SUCCESS.should.have.property('_id');
      res.body.SUCCESS.title.should.equal('nodejs');
      res.body.SUCCESS.description.should.equal('awesome');
      done();
    });
});

it('should update a SINGLE note with id PUT', function (done) {
  chai.request(server)
    .get('/notes')
    .end(function (err, res) {
      chai.request(server)
        .put('/notes/' + res.body[0]._id)
        .send({ 'title': 'anyDifferentTitle' })
        .end(function (error, response) {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('UPDATED');
          response.body.UPDATED.should.be.a('object');
          response.body.UPDATED.should.have.property('title');
          response.body.UPDATED.should.have.property('_id');
          response.body.UPDATED.title.should.equal('anyDifferentTitle');
          done();
        });
    });
});

it('should delete a SINGLE note with id DELETE', function (done) {
  chai.request(server)
    .get('/notes')
    .end(function (err, res) {
      chai.request(server)
        .delete('/notes/' + res.body[0]._id)
        .end(function (error, response) {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('REMOVED');
          response.body.REMOVED.should.be.a('object');
          response.body.REMOVED.should.have.property('title');
          response.body.REMOVED.should.have.property('_id');
          response.body.REMOVED.title.should.equal('anyDifferentTitle');
          done();
        });
    });
});