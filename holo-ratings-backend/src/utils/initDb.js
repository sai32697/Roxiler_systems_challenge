require('dotenv').config();
const { Sequelize } = require('sequelize');

async function createDatabase() {
  // First connect without specifying database to create it
  const sequelize = new Sequelize('', process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: console.log,
  });

  try {
    await sequelize.authenticate();
    console.log('Connected to MySQL server');
    
    // Create database if it doesn't exist
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    console.log(`Database '${process.env.DB_NAME}' created or already exists`);
    
    await sequelize.close();
    return true;
  } catch (error) {
    console.error('Error creating database:', error);
    await sequelize.close();
    return false;
  }
}

module.exports = { createDatabase };
