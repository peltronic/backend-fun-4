const request = require('supertest')
const app = require('../app.js')

describe('Basic API tests', () => {

  let token = null

  it('should successfully sign in a user', (done) => {
    request(app)
      .post('/login')
      .send({ username: 'peter', password: 'foo' })
      .expect(200)
      .then((res) => {
        token = res.body.user.token
        done()
        //expect(res.headers.location).to.be.eql('123456/wallet');
        // more validations can be added here as required
      }).catch(err => {
        console.log('[TEST] error')
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
        console.log('[TEST] /datetime', {
          body: res.body
        })
        done()
        //expect(res.headers.location).to.be.eql('123456/wallet');
        // more validations can be added here as required
      }).catch(err => {
        console.log('[TEST] error')
        done(err)
      })
  })

})
