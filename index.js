const express = require('express');
require('dotenv').config();
require('./backend/models/db');

const userRouter = require('./backend/routes/users');
const locationRouter = require('./backend/routes/locations');
const billRouter = require('./backend/routes/bills');
const statisticRouter = require('./backend/routes/statistics');

const app = express();

app.use(express.json());

app.use(userRouter);
app.use(locationRouter);
app.use(billRouter);
app.use(statisticRouter);

app.get('/test', (req, res) => {
  res.send('Hello world');
});

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Welcome to backend zone!' });
});

app.listen(8000, () => {
  console.log('port is listening');
});