const fs = require('fs');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let UserSchema = new mongoose.Schema({
  email: { type: String, required: true  },
  password: { type: String, required: true }
});

UserSchema.pre('save', function (next) {
  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  const password = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, password, (err, isMatch) => {
      if (err || !isMatch) reject();
      else resolve();
    });
  });
};

let OpeningSchema = new mongoose.Schema({
  ecoCode: { type: String, required: true },
  name: { type: String, required: true },
  rawPgn: { type: String, required: true },
  moves: String
});

module.exports.User = mongoose.model('User', UserSchema);
module.exports.Opening = mondoose.model('Opening', OpeningSchema);

mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DB, process.env.DB_SSL ? {
  ssl: true,
  sslValidate: false,
  sslCA: fs.readFileSync(process.env.DB_SSL)
} : {}, (err) => {
  if (err) console.log(err);
  else console.log('connected to mongodb');
});

