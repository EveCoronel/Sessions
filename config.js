const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  DB_PASSWORD: process.env.DB_PASSWORD
}