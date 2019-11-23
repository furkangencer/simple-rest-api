const express = require('express');
const mongoose = require('mongoose');
let routes = require('./routes');

let app = express();

/**
 * Creates the express server, registers middlewares and routes
 */
let createServer = () => {
  app.set('port', process.env.PORT);

  // Add middleware for logging all requests. For development only!
  if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
      console.log(`A ${req.method} request was made to: ${req.originalUrl} at ${Date.now()}`);
      next();
    });
  }

  // Add middleware to parse the json
  app.use(express.json());
  app.use(express.urlencoded({
    extended: false
  }));

  // Connect to database
  mongoose.connect(
    process.env.DATABASE_URL,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  )
    .then(() => console.log('Succesfuly connected to db'))
    .catch(err => {
      throw new Error(err)
    });

  // Set up routes
  routes.init(app);
}

/**
 * Starts the server on the port specified as environment variable
 */
let startServer = () => {
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`Express server listening on port: ${port}`);
  });
}

module.exports = {
  createServer,
  startServer
};