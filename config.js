module.exports = {
  "development": {
    "database": "mongodb://localhost/prestigious",
    "secret": "my furry cat house"
  },
  "production": {
    "database": process.env.MONGODB_URI,
    "secret": "my furry cat house"
  },
  "env": process.env.NODE_ENV || "development"
}