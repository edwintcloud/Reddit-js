const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const app = require('../../server');

// setup chai to use http assertion
chai.use(chaiHttp);

// start our tests
describe('App', () => {

  // Test home route
  it('should render home page on / GET', async () => {
    const res = await chai.request(app).get('/');
    res.should.have.status(200);
    res.should.be.html;
  });
  
});