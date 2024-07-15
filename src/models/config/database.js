var Sequelize = require('sequelize');

// const sequelize = new Sequelize(
// 'ai2_postgres',
// 'postgres',
// 'postgres',
// {
// host: 'localhost',
// port: '5432',
// dialect: 'postgres'
// }
// );

const sequelize = new Sequelize("postgresql://ai2_postgres:5zpJfmq9OvOwqiNdtlAxyRUtc6MhCyeM@dpg-cq818n2j1k6c738rq00g-a/ai2_postgres", {
  dialect: "postgres",
});

module.exports = sequelize;