const chai = require('chai'),
  chaiHttp = require('chai-http'),
  server = require('../bin/www'),
  should = chai.should();

chai.use(chaiHttp);

describe('Todos', function() {
  this.timeout(5000);
  it('should list ALL todos on / GET', function(done) {
    chai.request(server)
      .get('/')
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      });
  });
});
