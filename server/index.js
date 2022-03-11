const app = require('./app.js');
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serving up now at ${PORT}`);
});