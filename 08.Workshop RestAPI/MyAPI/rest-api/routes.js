const router = require('express').Router();
const authController = require('./controllers/authController');
const movieController = require('./controllers/movieContoller');

router.use('/auth', authController);
router.use('/movies', movieController);

module.exports = router;
