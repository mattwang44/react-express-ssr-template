const mongoose = require('mongoose');
const config = require('./config');

exports.connect = () => {
    // Options for removing deprecated warnings, see
    // https://mongoosejs.com/docs/deprecations.html for detail
    const options = {
        ...config.mongo.options,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    };
    return mongoose.connect(config.mongo.uri, options);
};

exports.close = () => {
    return mongoose.connection.close();
};
