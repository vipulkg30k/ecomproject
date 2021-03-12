const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/99Store', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
  console.log('Connected to mongodb')
})
