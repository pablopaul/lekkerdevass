const db = require("../models");
const User = db.user;

exports.userList = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send({
      message: 'Team list',
      data: users
    })
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.userInfo = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { attributes: ['name', 'score'] });
    res.status(200).send({
      message: 'User info',
      data: user
    })
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
