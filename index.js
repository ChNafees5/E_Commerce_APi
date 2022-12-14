const mongoose = require('mongoose');
const express = require('express');
const app = express();
let port = 3000;
var mongoDB = 'mongodb://127.0.0.1/ecomerc';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
//db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => { console.log('Connected to Mongo database')});
app.use(express.json())
const userRoute = require('./routers/user')
const authRoute = require('./routers/auth')
const productRoute = require('./routers/product')
const orderRoute = require('./routers/order')
const chartRoute = require('./routers/cart')
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/product', productRoute)
app.use('/api/order', orderRoute)
app.use('/api/cart', chartRoute)
app.listen(3000, () => {
  console.log(`server is listening on Port: ${port}`);
})