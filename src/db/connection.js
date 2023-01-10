// Include Dotenv to load environments - will be used for db connection 
require('dotenv').config()

// Use Sequelize 
const { Sequelize } =  require("sequelize");

// Create new Sequelize environment 
const sequelize = new Sequelize(process.env.MYSQL_URI);

// Authenticate Sequelize
sequelize.authenticate();

// Test Connection 
console.log('Connection has been established successfully.');

module.exports = {sequelize}