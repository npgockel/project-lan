// Requiring path to so we can use relative routes to our HTML files
const router = require("express").Router();
const db = require("../models");
const axios = require("axios");
const Op = db.Sequelize.Op;

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

/**
 * Home Page
 */
router.get("/", function(req, res) {
    res.render("index", { user: req.user });
});

/**
 * Home Page, again
 */
router.get("/home", function(req, res) {
    res.render("index", { user: req.user });
});

router.get("/availability", isAuthenticated, function(req, res) {
    db.Availability.findAll({
            where: { UserId: req.user.id },
            raw: true,
            // include: [db.User]
        }) // Joins User to Timeblock! And scrapes all the seqeulize stuff off
        .then((dbModel) => {
            res.render("availability", { user: req.user, Availability: dbModel });
        })
        .catch((err) => res.status(422).json(err));
});

router.get("/deploy", isAuthenticated, async function(req, res) {
    var user = await db.User.findByPk(req.user.id);
    var Availabilities = await user.getAvailabilities();
    var deploys = await user.getSchedules({ raw: true });
    const scheduleIds = deploys.map((availability) => availability.id);

    console.table(scheduleIds);
    db.Availability.findAll({
            where: {
                UserId: {
                    [Op.ne]: req.user.id,
                },
                ScheduleId: {
                    [Op.or]: {
                        [Op.notIn]: scheduleIds,
                        [Op.eq]: null,
                    },
                },
            },
            raw: true,
        })
        .then((availableAvailabilities) => {
            res.render("deploy", {
                user: req.user,
                Availabilities: availableAvailabilities,
                Deploys: deploys,
            });
        })
        .catch((err) => res.status(422).json(err));
});

// display User console page
router.get("/profile", isAuthenticated, function(req, res) {
    res.render("profile", { user: req.user });
});

/**
 * Signup page
 */
router.get("/signup", function(req, res) {
    if (req.user) {
        res.redirect("/");
    } else {
        res.render("signup", { user: req.user });
    }
});

/**
 * Login page
 */
router.get("/login", function(req, res) {
    if (req.user) {
        res.redirect("/");
    } else {
        res.render("login", { user: req.user });
    }
});

/**
 * Generic Error Page
 */
router.get("*", function(req, res) {
    res.render("errors/404", { user: req.user });
});

module.exports = router;