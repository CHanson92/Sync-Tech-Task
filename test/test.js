const { assert } = require('chai');
const { expect } = require('chai');
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');
const Registration = require('../models/Registration');

describe('Registration', () => {
  before((done) => {
    mongoose.connect('mongodb://localhost/sync');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('We are connected to test database!');
      done();
    });
  });

  it('Registration works!', () => {
    const john = new Registration({ name: 'john', email: 'john@example.com' });
    const secret = process.env.SOME_LONG_UNGUESSABLE_STRING;

    Registration.plugin(encrypt, { secret });

    john.save((err) => {
      if (err) { return done(); }
      throw new Error('Should generate error!');
    });
  });
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });
});
