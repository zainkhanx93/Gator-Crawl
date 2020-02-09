require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./app/users/user.routes.js');

const db = require('./app/database');

const app = express();

app.use(bodyParser.json());
app.use('/api/users', userRoutes);

db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and re-sync db');
});

app.get('/', (req, res) => {
  res.json({ message: 'hello world' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
