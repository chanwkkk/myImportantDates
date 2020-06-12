/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name is required.'],
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'A password is required.'],
    minlength: 5,
    maxlength: 10,
  },
  eventIDs: [{type: String}]
});

module.exports = mongoose.model('User', userSchema);
