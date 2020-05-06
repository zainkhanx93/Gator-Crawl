require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const db = require('./models/index.js');

const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');
const saleRoutes = require('./routes/sale');
const adminRoutes = require('./routes/admin');
const imageUploadRoute = require('./routes/imageUpload');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use('/admin', adminRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('', imageUploadRoute);

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
