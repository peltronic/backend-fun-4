# Dojo Five Practical Challenge for Peter Gorgone -- Option 4: Backend Fun

## Initial Instructions
> Create a REST API to serve out the current time securely. Include an unprotected API to login and receive a token, and a protected API to receive the current time. Use a docker environment to build and run the code

## Install Notes

Clone the code:
```
$ git clone git@github.com:peltronic/backend-fun-4.git
```

Copy the example env file to *.env* in the root folder, set *TOKEN_KEY* to a random string:
```
$ cp dot-env.txt .env
```

Run the tests:
```
$ npm run test
```

Run the dev app:
```
$ npm run dev
```

If using Postman or curl, use the following test credentials for sign-in:
```
u: peter
p: test-123
```

And/or reference the files under the test/ folder for examples.

NOTE: Server runs on port 5000 by default.

## Design & Development Notes
- Persistent storage such as a database is 'stubbed' in the User 'model' using an array of users. Passwords are cleartext.
- In a production app we would use bcrypt (bcryptjs package) to secure the passwords.
- In a production app we would also use Express router, and an ORM package such as Sequelize or Mongoose to access a real database.
