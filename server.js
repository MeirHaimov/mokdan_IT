const dotenv = require('dotenv');
const app = require('./app');

process.env.PORT = 3000; 

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`---Running On Port ${port}!--- `);
});