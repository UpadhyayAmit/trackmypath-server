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

module.exports = router;
