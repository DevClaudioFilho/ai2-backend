var Sequelize = require('sequelize');

const sequelize = new Sequelize(
'ai2_postgres',
'ai2_postgres',
'5zpJfmq9OvOwqiNdtlAxyRUtc6MhCyeM',
{
host: 'postgresql://ai2_postgres:5zpJfmq9OvOwqiNdtlAxyRUtc6MhCyeM@dpg-cq818n2j1k6c738rq00g-a.oregon-postgres.render.com/ai2_postgres',
port: '5432',
dialect: 'postgres'
}
);

module.exports = sequelize;