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
  console.log("req.user: ", req.user);
  db.Availability.findAll({
    where: { UserId: req.user.id },
    raw: true,
    // include: [db.User]
  }) // Joins User to Timeblock! And scrapes all the seqeulize stuff off
    .then((dbModel) => {
      console.log(req.user);
      res.render("availability", { user: req.user, Availability: dbModel });
    })
    .catch((err) => res.status(422).json(err));
});

router.get("/deploy", isAuthenticated, async function(req, res) {
  var Deploys = await db.Deploy.findAll({ raw: true });

  console.log(Deploys);
  db.Availability.findAll({
    where: {
      UserId: {
        [Op.ne]: req.user.id,
      },
    },
    raw: true,
  })
    .then((dbModel) => {
      console.log(dbModel);
      res.render("deploy", {
        user: req.user,
        Availabilities: dbModel,
        Deploys: Deploys,
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
