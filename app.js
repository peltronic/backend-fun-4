require('dotenv').config()

//import { join, dirname } from 'path'
//import { Low, JSONFile } from 'lowdb'
//import { fileURLToPath } from 'url'

//require('./config/database').connect()
const express = require('express')
//const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const auth = require('./middleware/auth')

const app = express()

app.use(express.json())

const UserModel = require('./model/user')
const User = new UserModel.User()

// ------------------------------------
// Login
// ------------------------------------

app.post('/login', async (req, res) => {

  try {
    const { username, password } = req.body

    if ( !(username && password) ) {
      return res.status(400).json({ msg: 'Please provide username and password' })
    }

    const sessionUser = await User.findOne({ username })
    //const sessionUser = User.findOne({ username })

    if (!sessionUser) {
      //if (!sessionUser || !(await bcrypt.compare(password, sessionUser.password))) {
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

    sessionUser.token = token // 'save' token

    return res.status(200).json({ user: sessionUser })

  } catch (err) {
    console.log('app.js - Error', { err })
  }
})

app.get('/datetime', auth, async (req, res) => {
  try {
    //const ts = Date.now()
    const ts = new Date
    return res.json({ 
      timestamp: ts,
      local: ts.toLocaleString(),
    })
  } catch(err) {
    return res.status(500).json({ msg: 'Server Error' })
  }
})

app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Not found",
    error: {
      statusCode: 404,
      message: "Not Found",
    },
  })
})

module.exports = app
