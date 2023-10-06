module.exports = (sequelize, Model, DataTypes) => {
    class Team extends Model {}

    Team.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        maxMembers: {
            type: DataTypes.INTEGER,
            validate: {
                min: 11
            }
        },
        ownerId:DataTypes.INTEGER

    }, { sequelize, modelName: 'team'})

    return Team
};
