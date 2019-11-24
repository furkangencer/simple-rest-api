const mongoose = require('mongoose');

/**
 * Establish connection to MongoDB Database
 * @param dbUrl MongoDB database URL.
 * @param config Mongoose config.
 */
let dbCon;
const connectDb = (dbUrl='', config={}) => {
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
      .then((con) => {
        dbCon = con;
        resolve(con);
      })
      .catch(err => {
        reject(err);
      });
  })
}

// Close database connection
const disconnectDb = () => {
  return new Promise((resolve, reject) => {
    dbCon.connection.close()
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
};

module.exports = {
  connectDb,
  disconnectDb
}