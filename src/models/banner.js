var Sequelize = require('sequelize');
var sequelize = require('./config/database');

var Banner = sequelize.define('banner', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  img_url: {
    type: Sequelize.TEXT,
    unique: true,
    allowNull: false
  },
  img_alt: {
    type: Sequelize.STRING
  },
  title:{
    type: Sequelize.TEXT,
    allowNull: false
  },
  message: {
    type: Sequelize.TEXT
  },
 }
);

sequelize.sync()

module.exports = Banner