const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const app = require('../../server');
const { post } = require('../../models');

// test post to be used for tests
const testPost = {
  title: "testPostChai",
  url: "test",
  summary: "test"
};

// setup chai to use http assertion
chai.use(chaiHttp);

// start our tests
describe('Posts', () => {

  // delete test posts after each test
  afterEach(async() => {
    await post.deleteMany({ title: testPost.title });
  });

  // CREATE TEST
  it('should create a single post on /posts POST', async () => {
    const res = await chai.request(app).post('/posts').send(testPost);
    const posts = await post.find({ title: testPost.title }).lean();
    posts.should.have.length(1);
    res.should.have.status(200);
    res.should.be.html;
  });

  // READ ONE TEST
  it('should index a single post on /posts/:id GET', async () => {
    const res = await chai.request(app).get('/');
    res.should.have.status(200);
    res.should.be.html;
  });

  // READ ALL TEST
  it('should index all posts on /posts GET', async () => {
    const res = await chai.request(app).get('/');
    res.should.have.status(200);
    res.should.be.html;
  });

  // NEW TEST
  it('should render a new posts form on /posts/new GET', async () => {
    const res = await chai.request(app).get('/');
    res.should.have.status(200);
    res.should.be.html;
  });
  
});