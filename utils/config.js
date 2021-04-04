module.exports = {
  port: parseInt(process.env.PORT) || 8085,
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/99Store'
}
