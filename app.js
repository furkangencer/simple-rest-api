const express = require('express');
const mongoose = require('mongoose');

let app = express();
let createServer = () => {
  app.set('port', process.env.PORT);
  // app.set('hostname', config.hostname);

  // add middleware to parse the json
  app.use(express.json());
  app.use(express.urlencoded({
    extended: false
  }));

  //connect the database
  mongoose.connect(
    process.env.DATABASE_URL,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  )
    .then(() => {
      console.log('Succesfuly connected to db');
    });

}
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