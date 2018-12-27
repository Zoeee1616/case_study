const express = require('express')
const request = require('request')
const rp = require('request-promise')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const Product = require('./api/models/ProductModel')



//Connecting with MongoDB through Mongoose
mongoose.connect("mongodb://zoeytest2018:zoeytest2018@ds139944.mlab.com:39944/retail_price", {
  useNewUrlParser: true,
  useCreateIndex: true,
}).then(
  (res) => {
    console.log("Successfully connected to the database.")
  }
).catch(() => {
  console.log("Conntection to database failed.");
});

var routes = require('./api/routes/productRoute.js'); //importing route
routes(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))