'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const app = require('../app');
require( '../mongoose-setup' );

chai.use(chaiHttp);
const request = chai.request(app);

describe('back end test app', () => {

  const testImage = {url: 'http://i.imgur.com/MfA0Qhy.jpg', description: 'Sloth in a party hat.' };
  let resultImage = {};

  // it('loads', () => {
  //   assert.ok(true);
  // });

  it('posts with good data', () => {
    request
      .post('/api/images')
      .send(testImage)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.statusCode, 200);
        assert.include(res.header['content-type'], 'application/json');
        let result = JSON.parse(res.text);
        assert.equal(result.url, testImage.url);
        assert.equal(result.description, testImage.description); // store hashes, not plaintext passwords
        resultImage = result;
        done();
      });
  });

  it('posted image data can be retrieved by id', done => {
    request
      .get(`/api/images/${resultImage._id}`)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.statusCode, 200);
        assert.include(res.header['content-type'], 'application/json');
        let result = JSON.parse(res.text);
        assert.equal(result.url, testImage.url, res.text);
        assert.equal(result.description, testImage.description, res.text);
        done();
      });
  });

  it('get request on root route returns all images', done => {
    request
      .get('/api/images')
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.statusCode, 200);
        assert.include(res.header['content-type'], 'application/json');
        let result = JSON.parse(res.text);
        assert.isAbove(result.length, 0);
        done();
      });
  });

});
