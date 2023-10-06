const { auth } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/userList",
        [auth.verifyToken],
        controller.userList
    );

    app.get(
        "/user/:id",
        [auth.verifyToken],
        controller.userInfo
    );
};
