var Sequelize = require('sequelize');
var sequelize = require('./config/database');

const Book = require("./book")

var System = sequelize.define('systems', {
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
  short_description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description:{
    type: Sequelize.TEXT,
    allowNull: false
  },
  banner_image: Sequelize.STRING,
  how_play_text:{
    type: Sequelize.TEXT,
    allowNull: false
  },
  video_url: Sequelize.STRING
 }
);

System.hasMany(Book);
Book.belongsTo(System);

sequelize.sync()

module.exports = System