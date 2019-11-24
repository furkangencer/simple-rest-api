const app = require('./app');
const {connectDb} = require('./db/connection');

// Database connection
connectDb(process.env.DATABASE_URL)
  .then(()=> console.log('Successfully connected to db'))
  .catch(err => {
    console.error(err);
    process.exit(1);
  })

// Start the server on the port specified as environment variable
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Express server listening on port: ${port}`);
});