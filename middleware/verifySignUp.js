const db = require("../models");
const User = db.user;

checkDuplicateUsername = async (req, res, next) => {
    try {
        // Username
        let user = await User.findOne({
            where: {
                name: req.body.username
            }
        });

        if (user) {
            return res.status(400).send({
                message: "Failed! Username is already in use!"
            });
        }

        next();
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Unable to validate Username!"
        });
    }
};

const verifySignUp = {
    checkDuplicateUsername
};

module.exports = verifySignUp;