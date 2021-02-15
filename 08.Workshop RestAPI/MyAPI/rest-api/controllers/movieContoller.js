const router = require('express').Router();
const Movie = require('../models/Movie');

router.post('/', (req, res) => {
  console.log(req.body);

  let movie = new Movie(req.body);

  movie.save().then((createdMovie) => {
    res.status(201).json({
      _id: createdMovie._id
    });
  });
});

module.exports = router;
