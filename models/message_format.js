const mongoose = require('mongoose');

var message = mongoose.model('Message', {
  content: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  source_ip: {
    type: String,
  }
});
