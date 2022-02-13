import { Server } from 'http';
import server from '../src';
import request from 'supertest';

describe('Exress App', () => {
  let underTest: Server;

  beforeEach(() => {
    underTest = server;
  });

  afterEach(() => {
    underTest.close();
  });

  it('should start the server', () => {
    expect(underTest).toBeTruthy();
  });

  it('should return an un-resized image', (done) => {
    const imageName = 'fjord.jpg';
    request(server)
      .get(`/images/?fileName=${imageName}`)
      .expect(200)
      .end((err) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should return a resized image', (done) => {
    const imageName = 'fjord.jpg';
    request(server)
      .get(`/images/?fileName=${imageName}&width=50&height=50`)
      .expect(200)
      .end((err) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should return a 404 when the image is not found', (done) => {
    const imageName = 'notfound.jpg';
    request(server)
      .get(`/images/?fileName=${imageName}`)
      .expect(404)
      .end((err) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });
});
