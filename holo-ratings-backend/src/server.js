require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const models = require('./models');
const { createDatabase } = require('./utils/initDb');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const storeRoutes = require('./routes/store');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/stores', storeRoutes);

app.get('/', (req,res) => res.send('Holo Ratings API'));

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    // Create database if it doesn't exist
    const dbCreated = await createDatabase();
    if (!dbCreated) {
      console.error('Failed to create database');
      process.exit(1);
    }
    
    await sequelize.authenticate();
    console.log('DB connected');
    // sync models (in dev only) — in production use migrations
    await models.sequelize.sync({ alter: true }); // alter:true for easy dev
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  } catch (err) {
    console.error('Unable to start', err);
    process.exit(1);
  }
}

start();
