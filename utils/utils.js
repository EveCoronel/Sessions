const moment = require("moment/moment");

const formatMessage = (username, text) => {
    return {
        username,
        text,
        time: moment().format('DD/MM/YYYY - HH:mm')
    }
};


module.exports = {
    formatMessage
};