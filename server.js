const dotenv = require('dotenv');
process.env.PORT = 3000; 

const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`---Running On Port ${port}!--- `);
});