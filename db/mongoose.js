var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
let mongodbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/message_store';
mongoose.connect(mongodbURI, {useNewUrlParser: true});

module.exports = {mongoose};
