const mongoose = require("mongoose")
const { DB_NAME, DB_PORT, DB_HOST } = require("../config/db.config")
const DB_URI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`

function connect() {
  mongoose.set('useFindAndModify', false);
  mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Database connection success!")
  }, err => {
    console.log("Database connection failed!", err)
  })
}

module.exports = {
  connect
}