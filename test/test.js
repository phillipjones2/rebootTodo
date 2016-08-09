process.env.NODE_ENV = 'testing';

const chai = require('chai'),
  chaiHttp = require('chai-http'),
  mongoose = require('mongoose'),
  server = require('../bin/www'),
  Todo = require('../server/api/todo/todoModel'),
  should = chai.should(),
  logger = require('../server/util/logger'),
  config = require('../server/config/config');


  testTodo = {
    'title' : 'automated test title',
    'body' : 'automated test body',
    'priority' : 2
  };

chai.use(chaiHttp);

describe('Todos', function() {
  Todo.collection.drop();

  beforeEach(function(done) {
    var newTodo = new Todo(testTodo);
    newTodo.save(function(err) {
      done();
    });
  });
  afterEach(function(done) {
    Todo.collection.drop();
    done();
  });

  describe('Todos', function() {
    this.timeout(5000);
    //index
    it('should list ALL todos on / GET', function(done) {
      chai.request(server)
        .get('/todos')
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body[0].should.have.property('_id');
          res.body[0].should.have.property('title');
          res.body[0].should.have.property('body');
          res.body[0].should.have.property('priority');
          res.body[0].should.have.property('completed');
          res.body[0].title.should.equal(testTodo.title);
          res.body[0].body.should.equal(testTodo.body);
          res.body[0].priority.should.equal(testTodo.priority);
          res.body[0].completed.should.equal(false);
          done();
        });
    });
    // show
    it('should list a SINGLE todo on /todo/<id> GET', function(done) {
      var newTodo = new Todo({
        title: 'Single TODO',
        body: 'ID GET',
        priority: 2
      });
      newTodo.save(function(err, data) {
        chai.request(server)
          .get('/todos/'+data.id)
          .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('_id');
            res.body.should.have.property('title');
            res.body.should.have.property('body');
            res.body.should.have.property('priority');
            res.body.should.have.property('completed');
            res.body.title.should.equal(newTodo.title);
            res.body.body.should.equal(newTodo.body);
            res.body.priority.should.equal(newTodo.priority);
            res.body.completed.should.equal(false);

          done();
        });
      });
    });
    // create
    it('should add a SINGLE todo on /todos POST', function(done){
      chai.request(server)
        .post('/todos')
        .send({
          'title' : 'automated test title',
          'body' : 'automated test body',
          'priority' : 2
        })
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.have.property('_id');
          res.body.data.should.have.property('title');
          res.body.data.should.have.property('body');
          res.body.data.should.have.property('priority');
          res.body.data.should.have.property('completed');
          res.body.data.title.should.equal('automated test title');
          res.body.data.body.should.equal('automated test body');
          res.body.data.priority.should.equal(2);
          res.body.data.completed.should.equal(false);
          done();
        });
    });
    it('should update a SINGLE todo on /todos/<id> PUT', function(done) {
      chai.request(server)
        .get('/todos')
        .end(function(err, res) {
          chai.request(server)
            .put('/todos/' + res.body[0]._id)
            .send({
              'title': 'Updated TITLE',
              'body' : res.body[0].body,
              'priority' : res.body[0].priority
            })
            .end(function(err, res) {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('data');
              res.body.data.should.have.property('title');
              res.body.data.should.have.property('body');
              res.body.data.should.have.property('priority');
              res.body.data.title.should.equal('Updated TITLE');
              res.body.data.body.should.equal('automated test body');
              res.body.data.priority.should.equal(2);
              done();
          });
      });
    });
    it('should delete a SINGLE todo on /todos/<id> DELETE', function(done) {
      chai.request(server)
        .get('/todos')
        .end(function(err, res) {
          chai.request(server)
            .delete('/todos/' + res.body[0]._id)
            .end(function(err, res) {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
              done();
          });
        });
    });
  });
});
