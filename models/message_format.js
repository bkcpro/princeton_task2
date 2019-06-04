const mongoose = require('mongoose');

var Message = mongoose.model('Message', {
  content: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  source_ip: {
    type: String,
    trim: true
  },
  timeStamp: {
    type: String,
    trim: true
  }
});

module.exports = {Message};
