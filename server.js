const dotenv = require('dotenv');
// אם אין לך עדיין קובץ הגדרות, נגדיר פורט ברירת מחדל בשורה הבאה
process.env.PORT = 3000; 

const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`running on port${port}! `);
});