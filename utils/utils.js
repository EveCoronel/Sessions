const moment = require("moment/moment");

const formatMessage = (username, text) => {
    return {
        username,
        text,
        time: moment().format('DD/MM/YYYY - HH:mm')
    }
};


const successResponse = (data) => {
    return {
        success: true,
        data
    }
}

const errorResponse = (message, details = null) => {
    return {
        success: false,
        message,
        details
    }
}

class HttpError {
    constructor(status, message, details) {
        this.statusCode = status;
        this.message = message;
        this.details = details;
    }
}

const formatUser = (name) =>{
    return {
        name: name
    }
}

module.exports = {
    successResponse,
    errorResponse,
    HttpError,
    formatMessage,
    formatUser
}



