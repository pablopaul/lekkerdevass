const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('sqlite::memory:', {
    logging: process.env.IS_JEST ? false : true
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/user.model.js')(sequelize, Model, DataTypes);
db.team = require('../models/team.model.js')(sequelize, Model, DataTypes);

db.team.hasMany(db.user);
db.user.belongsTo(db.team);

module.exports = db;
