const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  // .connect(process.env.DATABASE_LOCAL, { /*  Connects to Local Database  */
  .connect(DB, {
    /*  Connects to Hosted Database on MongoDB Atlas   */
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB Connection Succesful'));

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`App Running on Port ${port} .... `);
});
