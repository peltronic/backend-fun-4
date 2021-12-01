const chai = require('chai')
const request = require('supertest')
const app = require('../app.js')

var assert = chai.assert
var expect = chai.expect
var should = chai.should

describe('Basic API test for successful date-time request', () => {

  let token = null

  it('should successfully sign in a user', (done) => {
    request(app)
      .post('/login')
      .send({ username: 'peter', password: 'test-123' })
      .expect(200)
      .then((res) => {
        expect(res.body).to.have.property('token')
        token = res.body.token
        done()
      }).catch(err => {
        console.log('[TEST] error', { err })
        done(err)
      })
  })

  it('should get the date and time', (done) => {
    request(app)
      .get('/datetime')
      .set({ "authorization": `${token}` })
      .send({})
      .expect(200)
      .then((res) => {
        expect(res.body).to.have.property('local')
        expect(res.body).to.have.property('timestamp')
        done()
      }).catch(err => {
        console.log('[TEST] error', { err })
        done(err)
      })
  })

})


describe('Test invalid login credentials', () => {

  let token = null

  it('should not sign in a user if invalid credentials', (done) => {
    request(app)
      .post('/login')
      .send({ username: 'peter', password: 'bad-password' })
      .expect(400)
      .then((res) => {
        done()
      }).catch(err => {
        console.log('[TEST] error', { err })
        done(err)
      })
  })


})

describe('Request date-time with bad token', () => {

  let token = null

  it('should successfully sign in a user', (done) => {
    request(app)
      .post('/login')
      .send({ username: 'peter', password: 'test-123' })
      .expect(200)
      .then((res) => {
        expect(res.body).to.have.property('token')
        token = res.body.token
        done()
      }).catch(err => {
        console.log('[TEST] error', { err })
        done(err)
      })
  })

  it('should not get the date and time if invalid token provided', (done) => {
    request(app)
      .get('/datetime')
      .set({ "authorization": 'my-bad-token' })
      .send({})
      .expect(401)
      .then((res) => {
        done()
      }).catch(err => {
        console.log('[TEST] error', { err })
        done(err)
      })
  })

})
