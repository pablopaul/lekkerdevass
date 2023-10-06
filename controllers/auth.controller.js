const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = require("../models");
const config = require("../config/auth.config");

const User = db.user;
const Op = db.Sequelize.Op;

exports.signup = async (req, res) => {
    try {
        const user = await User.create({
            name: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8),
            teamId: req.body.teamId,
            score: req.body.score
        });

        if (user) res.send({ message: "User registered successfully." });

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: error.message });
    }
};

exports.signin = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                name: req.body.username,
            },
        });

        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Invalid Password.",
            });
        }

        const token = jwt.sign({ id: user.id },
            config.secret,
            {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 86400, // 24 hours
            });

        req.session.token = token;

        return res.status(200).send({
            id: user.id,
            username: user.name
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error.message });
    }
};
