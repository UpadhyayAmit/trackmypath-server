const express = require('express');
const mongoose = require('mongoose');
const app = express();

const mongoUri =
  'mongodb+srv://admin:Admin%40123@cluster0.c5j77.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoUri, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
  console.log('connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to mongo', err);
});

app.get('/', (req, res) => {
  res.send('hi There ?');
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});

// # before encode
// Admin@#123%^
// # after encode
// Admin%40%23123%25%5E
