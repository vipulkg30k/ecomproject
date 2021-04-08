module.exports = {
  port: parseInt(process.env.PORT) || 8085,
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/99Store',
  baseUrl: process.env.BASE_URL || 'http://127.0.0.1:8085',
  assetUrl: process.env.ASSET_URL || 'http://127.0.0.1:8085'
}
