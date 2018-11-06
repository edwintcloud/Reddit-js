const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: true,
    unique: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
}, { timestamps: true });

// Hash password before saving User
UserSchema.pre('save', async function() {
  this.password = await bcrypt.hash(this.password, 10);
});

// Authenticate a User
UserSchema.statics.authenticate = async function(username, password) {
  const user = await this.find({ username: username }).limit(1).lean();
  if(user.length > 0) {
    const match = await bcrypt.compare(password, user[0].password);
    if(match) {
      return user[0];
    }
    return Promise.reject(new Error(`Invalid Password.`));
  }
  return Promise.reject(new Error(`Username not found.`));
}

module.exports = mongoose.model('User', UserSchema);
