var Sequelize = require('sequelize');
var sequelize = require('./config/database');

var SystemBooks = sequelize.define('SystemBooks', {});

module.exports = SystemBooks