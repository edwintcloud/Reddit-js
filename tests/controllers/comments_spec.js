const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const app = require('../../server');
const { comment, post, user } = require('../../models');

// test comment to be used for tests
const testComment = {
  content: "testCommentChai"
};

// create our testUser
const testUser = {
  username: 'chaiTestUser',
  password: 'testpassword',
  confirmPassword: 'testpassword'
};

// test post to be used for tests
const testPost = {
  title: "testPostChai",
  url: "test",
  summary: "test",
  subreddit: "test"
};

// setup chai to use http assertion
chai.use(chaiHttp);

// start our tests
describe('Comments', () => {

  // delete test posts and comments after each test
  afterEach(async() => {
    await comment.deleteMany({ content: testComment.content });
    await post.deleteMany({ title: testPost.title });
    await user.deleteMany({ username: testUser.username });
  });

  // CREATE TEST
  it('should create a single comment on /posts/:postId/comments POST', async () => {
    const agent = chai.request.agent(app);
    const newUser = await user.create(testUser);
    await agent.post(`/users/login`).send(testUser);
    const newPost = await post.create(testPost);
    const res = await agent.post(`/posts/${newPost._id}/comments`).send(testComment);
    const comments = await comment.find({ content: testComment.content }).lean();
    comments.should.have.length(1);
    res.should.have.status(200);
    res.should.be.html;
    agent.close();
  });
  
});
