// signup & sign In

const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, 'MY_SECREAT_KEY');
    res.send({ token: token });
  } catch (err) {
    //invalid data - 422
    return res.status(422).send(err.message);
  }

  res.send('you have made some request');
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' });
  }

  const user = await User.findOne({ email: email });
  if (!user) return res.status(404).send({ error: 'Email no found' });

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, 'MY_SECREAT_KEY');
    console.log(token);
    res.send({ token });
  } catch (err) {
    console.error('error', err);
    return res.status(422).send({ error: 'Invalid password or email' });
  }
});

module.exports = router;
