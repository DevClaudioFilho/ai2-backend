var Sequelize = require('sequelize');
var sequelize = require('./config/database');

const Post = require("./post")
const User = require("./user")

var Comment = sequelize.define('comments', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  comment:{
    type: Sequelize.TEXT,
    unique: true,
    allowNull: false
  },
  postId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'posts',
      key: 'id',
    },
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    }
 }
}
);

Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post);

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User);

sequelize.sync()

module.exports = Comment