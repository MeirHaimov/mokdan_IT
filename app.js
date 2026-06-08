const express = require('express');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use('/api/v1/users', userRouter);

app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'mokdan is running'
  });
});

module.exports = app;