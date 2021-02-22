const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
// const cors = require('./middlewares/cors');
// app.use(cors);

const app = express();
const routes = require('./routes');
const { auth } = require('./middlewares/auth');

mongoose.connect('mongodb://localhost/softuni-movies', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
//   .then(() => console.log('DB connection successfull'));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log(`DB Connected`);
});

app.use(cors());
//When we receive data as json from client
app.use(express.json()); // IMPORTANT FOR REST API

app.use(auth);
app.get('/', (req, res) => {
  res.json({
    message: "It's working"
  });
});

app.use('/api', routes);

app.listen(5000, console.log.bind(console, 'Server is listening on port 5000'));
