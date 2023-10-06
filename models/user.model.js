module.exports = (sequelize, Model, DataTypes) => {
    class User extends Model {}

    User.init({
        name: DataTypes.STRING,
        password: DataTypes.STRING,
        teamId: DataTypes.INTEGER,
        score: DataTypes.INTEGER
    }, { sequelize, modelName: 'user'})

    return User
};
