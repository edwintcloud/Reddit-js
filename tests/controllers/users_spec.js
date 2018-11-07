const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');
const should = chai.should();
const { user } = require('../../models');

// setup chai to use http assertion
chai.use(chaiHttp);

// create our testUser
const testUser = {
  username: 'chaiTestUser',
  password: 'testpassword',
  confirmPassword: 'testpassword'
};

describe('Users', () => {

  // delete test user after each test
  afterEach(async () => {
    await user.deleteMany({ username: testUser.username });
  });


  // CREATE/REGISTER ONE TEST
  it('should create a new user and set session at /users POST', async () => {
    const agent = chai.request.agent(app);
    const res = await agent.post(`/users`).send(testUser);
    res.should.have.status(200);
    res.should.be.html;
    res.req.should.have.cookie('connect.sid');
    agent.close();
  });

  // LOGIN TEST
  it('should login a single user by setting the session at /users/login POST', async () => {
    const agent = chai.request.agent(app);
    const newUser = await user.create(testUser);
    const res = await agent.post(`/users/login`).send(testUser);
    res.should.have.status(200);
    res.should.be.html;
    res.req.should.have.cookie('connect.sid');
    agent.close();
  });

  // LOGOUT TEST
  it('should logout a single user by destroying the session at /users/logout POST', async () => {
    const agent = chai.request.agent(app);
    const newUser = await user.create(testUser);
    await agent.post(`/users/login`).send(testUser);
    const res = await agent.get(`/users/logout`);
    res.should.have.status(200);
    res.should.be.html;
    res.should.not.have.cookie('connect.sid');
    agent.close();
  });

});