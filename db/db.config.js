const envConfig = require('../config');

module.exports = {
    mongodb: {
        uri: `mongodb+srv://ecommerce:${envConfig.DB_PASSWORD}@cluster0.hjesg.mongodb.net/ecommerce?retryWrites=true&w=majority`
    }
}