const mongoose = require('mongoose')
const config = require('./config')
mongoose.connect(config.mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
  console.log('Connected to mongodb')
})

module.exports = mongoose.connection
