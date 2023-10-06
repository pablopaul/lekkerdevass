const db = require("../models");
const Team = db.team;
const User = db.user;

exports.createTeam = async (req, res) => {
  try {
    const team = await Team.create({
      name: req.body.name,
      maxMembers: req.body.maxMembers,
      ownerId: req.userId
    });

    // Update teamId of current user
    await db.user.update({
      teamId: team.id
    }, {
      where: {
        id: req.userId
      }
    });

    res.status(200).send({
      message: 'Team created successfully.'
    });

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.teamList = async (req, res) => {
  try {
    const teams = await Team.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: {
        model: User,
        attributes: { exclude: ['id','createdAt', 'updatedAt', 'password', 'teamId'] }
      }
    });

    const records = teams.map(function(team) {
      return team.dataValues
    })

    const updatedTeams = await Promise.all(

          records.map( async function(team){

                const teamScore = await User.sum('score', {
                  where: {
                    teamId: team.id
                  }
                });

                const currentMemberCount = await User.count({
                  where: {
                    teamId: team.id
                  }
                });

                return {
                  ...team,
                  owner: await User.findByPk(team.ownerId, { attributes: ['name'] }),
                  totalScore: teamScore,
                  memberCount: currentMemberCount,
                  availableMemberCount: team.maxMembers - currentMemberCount
              }
            }
          )
    );

    res.status(200).send({
      message: 'Team list',
      data: updatedTeams
    })
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.updateTeam = async (req, res) => {
  try {
    const team = await Team.update({
      name: req.body.name,
      maxMembers: req.body.maxMembers
    }, {
      where: {
        ownerId: req.userId
      }
    });

    res.status(200).send({
      message: 'Team updated successfully.'
    });

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.deleteTeam = async (req, res) => {
  try {
    // TODO: Implement more granular control which team to delete if current user owns more then one team
    const deletion = await Team.destroy({
      where: {
        ownerId: req.userId
      }
    });

    res.status(200).send({
      message: 'Team(s) deleted.'
    });

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};