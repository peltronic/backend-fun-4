require('dotenv').config()

const express = require('express')
const jwt = require('jsonwebtoken')

const auth = require('./middleware/auth')

const app = express()

app.use(express.json())

const UserModel = require('./model/user')
const User = new UserModel.User()

//------------------------------------
// API
//------------------------------------

// --- Login ---

app.post('/login', async (req, res) => {

  try {
    const { username, password } = req.body

    if ( !(username && password) ) {
      return res.status(400).json({ msg: 'Please provide username and password' })
    }

    const sessionUser = await User.findOne(username)

    if ( !sessionUser ) {
      console.log('[ERROR] app.js -- could not find user')
      return res.status(400).json({ msg: 'Invalid Credentials' }) // really a 404 but we don't want to expose any hints that could aid a hacker
    }

    if ( !(await User.isCredentialsValid(username, password)) ) {
      return res.status(400).json({ msg: 'Invalid Credentials' })
    }

    // Create token
    const token = jwt.sign(
      { 
        user_id: sessionUser._id, 
        username ,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: '2h',
      }
    )

    User.setToken(sessionUser.username, token)

    return res.status(200).json({ user: sessionUser, token: token })

  } catch (err) {
    console.log('app.js::login() - Error', { err })
    return res.status(500).json({ msg: 'Server Error' })
  }
})

// --- Date Time ---

app.get('/datetime', auth, async (req, res) => {
  try {
    const ts = new Date
    return res.json({ 
      timestamp: ts,
      local: ts.toLocaleString(),
    })
  } catch(err) {
    console.log('app.js::datetime() - Error', { err })
    return res.status(500).json({ msg: 'Server Error' })
  }
})

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Not found',
    error: {
      statusCode: 404,
      message: 'Not Found',
    },
  })
})

module.exports = app
