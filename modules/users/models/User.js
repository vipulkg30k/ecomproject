const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'name can\'t be longer than 2 character'],
    maxlength: [64, 'name can\'t be longer than 64 character']
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, 'Email is Required'],
    maxlength: [128, 'email can\'t be longer than128 characters'],
    index: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
},
{
  timestamp: true
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

const User = mongoose.model('user', userSchema)

module.exports = User
