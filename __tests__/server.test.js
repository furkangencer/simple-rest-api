/**
 * @jest-environment node
 */
const app = require('../app');
const {connectDb, disconnectDb} = require('./../db/connection');
const request = require('supertest')

const dbUrl = process.env.DATABASE_URL || "mongodb://dbUser:dbPassword1@ds249623.mlab.com:49623/getir-case-study";

beforeAll(() => {
  return connectDb(dbUrl);
});

afterAll(() => {
  return disconnectDb();
})

describe('POST /api/v1/records', () => {
  it('should return records', function (done) {
    request(app)
      .post('/api/v1/records')
      .send({
        startDate: "2017-01-01",
        endDate: "2017-01-02",
        minCount: 100,
        maxCount: 700
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).toHaveProperty('records');
        expect(res.body.records.length).toBe(5);
        done();
      });
  });

  it('should return empty array of records', function (done) {
    request(app)
      .post('/api/v1/records')
      .send({
        startDate: "2019-01-01",
        endDate: "2019-01-02",
        minCount: 100,
        maxCount: 700
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).toHaveProperty('records');
        expect(res.body.records.length).toBe(0);
        done();
      });
  });

  it('should return missing field error: \'maxCount\'', function (done) {
    request(app)
      .post('/api/v1/records')
      .send({
        startDate: "2019-01-01",
        endDate: "2019-01-02",
        minCount: 100
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).toHaveProperty('msg');
        expect(res.body).toHaveProperty('field');
        expect(res.body.msg).toBe('Required field missing');
        expect(res.body.field).toBe('maxCount');
        done();
      });
  });
})

describe('POST /api/v1/someotherendpoint', () => {
  it('should return \'Not Found\'', function (done) {
    request(app)
      .post('/api/v1/someotherendpoint')
      .expect('Content-Type', /json/)
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).toHaveProperty('code');
        expect(res.body).toHaveProperty('msg');
        expect(res.body.code).toBe(404);
        expect(res.body.msg).toBe("Not found");
        done();
      });
  });
})

describe('GET /api/v1/records', () => {
  it('should return \'Not Found\'', function (done) {
    request(app)
      .get('/api/v1/records')
      .expect('Content-Type', /json/)
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).toHaveProperty('code');
        expect(res.body).toHaveProperty('msg');
        expect(res.body.code).toBe(404);
        expect(res.body.msg).toBe("Not found");
        done();
      });
  });
})

describe('PUT /api/v1/records', () => {
  it('should return \'Not Found\'', function (done) {
    request(app)
      .put('/api/v1/records')
      .send({
        startDate: "2017-01-01",
        endDate: "2017-01-02",
        minCount: 100,
        maxCount: 700
      })
      .expect('Content-Type', /json/)
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).toHaveProperty('code');
        expect(res.body).toHaveProperty('msg');
        expect(res.body.code).toBe(404);
        expect(res.body.msg).toBe("Not found");
        done();
      });
  });
})