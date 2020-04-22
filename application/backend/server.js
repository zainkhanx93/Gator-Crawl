require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser')
const db = require('./models/index.js');
const fileUpload = require('express-fileupload');

const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(fileUpload());
// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

app.use(express.static(path.resolve(__dirname, '../', 'frontend', 'build')));

app.get('/', (req, res) => {
  res.json({ message: 'hello world' });
});

app.get('*', (req, res) => {
  res.sendFile(
    path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
  );
});

const PORT = process.env.PORT || 8080;

const createDatabaseOnSync = false;

db.sequelize.sync({ force: createDatabaseOnSync }).then(() => {
  if (createDatabaseOnSync) {
    console.log('Drop and re-sync db');
  }

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
