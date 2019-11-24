const mongoose = require('mongoose');

/**
 * Establish connection to MongoDB Database
 * @param dbUrl MongoDB database URL.
 * @param config MongoDB database URL.
 */
let connectToDb = (dbUrl='', config={}) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      dbUrl,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        ...config
      }
    )
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  })
}

module.exports = {
  connectToDb
}