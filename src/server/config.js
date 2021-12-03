'use strict';

let config = {
    mongo: {
        isReplica: false,
        uri: process.env.MONGO_URI
    },
    env: process.env.NODE_ENV || 'production'
};


let nodeEnv = process.env.NODE_ENV;
if (nodeEnv === 'production') {
    // hide sensitive data from console.log
    const copiedConfig = JSON.parse(JSON.stringify(config));
    const protectedString = '******';
    copiedConfig.mongo.uri = protectedString;
    console.log({msg: 'Configuration used', content: copiedConfig});
} else {
    console.log({msg: 'Configuration used', content: config});
}


module.exports = config;