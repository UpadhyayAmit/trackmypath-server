require('./models/User');
require('./models/Track');

const express = require('express');
const mongoose = require('mongoose');

//to make expres api to understand json based request
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri =
  'mongodb+srv://admin:Admin%40123@cluster0.c5j77.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoUri, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
  console.log('connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to mongo', err);
});

app.get('/', requireAuth, (req, res) => {
  console.log(req.user.email);
  res.send(`your email : ${req.user.email}`);
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});

// # before encode
// Admin@#123%^
// # after encode
// Admin%40%23123%25%5E
