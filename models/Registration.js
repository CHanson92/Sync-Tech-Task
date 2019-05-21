const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');

const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
});

// Add any other plugins or middleware here. For example, middleware for hashing passwords

const secret = process.env.SOME_LONG_UNGUESSABLE_STRING;

registrationSchema.plugin(encrypt, { secret });
// This adds _ct and _ac fields to the schema, as well as pre 'init' and pre 'save' middleware,
// and encrypt, decrypt, sign, and authenticate instance methods

module.exports = mongoose.model('Registration', registrationSchema);
