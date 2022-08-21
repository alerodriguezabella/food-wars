const session = require('express-session');
const MongoStore = require('connect-mongo')

module.exports = app => {
 
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 60 * 1000 ms === 1 min
      },
      store: new MongoStore({
        mongoUrl: 'mongodb://localhost/food-wars',
        ttl: 60 * 60 * 24 // 60sec * 60min * 24h => 1 day      
      })
    })
  );
};
