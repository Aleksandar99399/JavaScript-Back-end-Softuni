const router = require('express').Router();
const isAuth = require('../controllers/isAuth');

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/secret-action', isAuth, (req, res) => {
  res.send('Verry Verry Secret');
});

module.exports = router;
