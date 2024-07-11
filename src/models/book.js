var Sequelize = require('sequelize');
var sequelize = require('./config/database');

var Book = sequelize.define('books', {
  id: {
     type: Sequelize.INTEGER,
     primaryKey: true,
     autoIncrement: true,
  },
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  short_description: Sequelize.STRING,
  description: Sequelize.TEXT,
  banner_image: Sequelize.STRING,
  link_url:{
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
 }
);

module.exports = Book