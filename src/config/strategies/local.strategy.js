const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:local.strategy');

module.exports = function localStrategy() {
  passport.use(new Strategy({
    usernameField: 'username',
    passportField: 'password'
  }, (username, password, done) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';
    (async function verfiyUser() {
      let client;
      try {
        client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const col = db.collection('users');
        const user = await col.findOne({ username });
        debug(user);
        if (user.password === password) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (error) {
        debug(error);
      }
    }());
  }));
};
