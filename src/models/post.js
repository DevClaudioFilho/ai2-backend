var Sequelize = require('sequelize');
var sequelize = require('./config/database');

var User = require('./user');

var Post = sequelize.define('posts', {
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
  text:{
    type: Sequelize.TEXT,
    allowNull: false
  },
  banner_image: Sequelize.STRING
 }
);

User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User);


sequelize.sync()

module.exports = Post