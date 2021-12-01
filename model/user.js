// Constructor
function User() {
  this._id = 1
  this.username = 'peter'
  this.password = 'test-123'
  this.token = 'foo'
}

User.prototype.findOne = async function(username) {
  return {
    _id: this._id,
    username: this.username,
    password: this.password,
  }
};

module.exports = {
  User: User
}


