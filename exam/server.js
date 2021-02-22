const express = require('express');

const routes = require('./routes');
const globalHandler = require('./controllers/errorController');
const { PORT } = require('./config/config');

const app = express();

require('./config/mongoose');
require('./config/express')(app);

app.use(routes);

app.use(globalHandler);

app.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`);
});
