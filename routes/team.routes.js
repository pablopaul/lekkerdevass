const { auth } = require("../middleware");
const controller = require("../controllers/team.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/team",
        [auth.verifyToken],
        controller.createTeam
    );

    app.get(
        "/teamList",
        [auth.verifyToken],
        controller.teamList
    );

    app.patch(
        "/team",
        [auth.verifyToken],
        // TODO verify owner
        controller.updateTeam
    );

    app.delete(
        "/team",
        [auth.verifyToken],
        // TODO verify owner
        controller.deleteTeam
    );
};
