process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // or wherever your app file is
const mongoose = require('mongoose');
const Link = require('../models/link.model');

chai.use(chaiHttp);
const { expect } = chai;

describe('🔗 Link API', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    await Link.deleteMany(); // Clear DB before tests
  });

  after(async () => {
    await mongoose.disconnect();
  });

  let testId;

  it('POST /links - should create a new link', (done) => {
    const newLink = {
      title: 'OpenAI',
      url: 'https://openai.com',
      category: 'Technology',
    };

    chai.request(app)
      .post('/link')
      .send(newLink)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.include({ title: 'OpenAI' });
        testId = res.body._id;
        done();
      });
  });

  it('GET /link - should get all links', (done) => {
    chai.request(app)
      .get('/api/links')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('PUT /link/:id - should update a link', (done) => {
    chai.request(app)
      .put(`/api/links/${testId}`)
      .send({ notes: 'AI tools link' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.notes).to.equal('AI tools link');
        done();
      });
  });

  it('DELETE /link/:id - should delete a link', (done) => {
    chai.request(app)
      .delete(`/api/links/${testId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Link deleted');
        done();
      });
  });
});
