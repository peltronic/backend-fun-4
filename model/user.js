//const bcrypt = require('bcryptjs')

function User() { // Constructor
  this.users = [
    { _id: 1, username: 'peter', password: 'test-123', token: null },
    { _id: 2, username: 'joe', password: 'test-123', token: null },
  ]
}

User.prototype.findOne = async function(username) {
  return this.users.find( u => u.username === username )
}

User.prototype.setToken = function(username, token) {
  const idx = this.users.findIndex( u => u.username === username )
  if ( idx < 0 ) { 
    throw new Error('Could not set token, user not found')
  }
  this.users[idx].token = token // set the token
  return this.users[idx]
}

User.prototype.getToken = function(username) {
  const user = this.users.find( u => u.username === username )
  return {
    token: user.token,
  }
}

User.prototype.isCredentialsValid = async function(username, password) {
  const user = this.users.find( u => u.username === username )
  //const is = await bcrypt.compare(password, user.password)
  const is = password === user.password
  return is
}

module.exports = {
  User: User
}


