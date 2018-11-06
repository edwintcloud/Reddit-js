const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const app = require('../../server');
const { comment, post } = require('../../models');

// test comment to be used for tests
const testComment = {
  content: "testCommentChai"
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
  });

  // CREATE TEST
  it('should create a single comment on /posts/:postId/comments POST', async () => {
    const newPost = await post.create(testPost);
    const res = await chai.request(app).post(`/posts/${newPost._id}/comments`).send(testComment);
    const comments = await comment.find({ content: testComment.content }).lean();
    comments.should.have.length(1);
    res.should.have.status(200);
    res.should.be.html;
  });
  
});
