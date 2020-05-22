// Requiring path to so we can use relative routes to our HTML files
const router = require("express").Router();
const db = require("../models");
const axios = require("axios");

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
  db.Timeblocks.findAll({
    where: { UserId: req.user.id },
    raw: true,
    // include: [db.User]
  }) // Joins User to Timeblock! And scrapes all the seqeulize stuff off
    .then((dbModel) => {
      console.log(req.user);
      res.render("availability", { user: req.user, Timeblocks: dbModel });
    })
    .catch((err) => res.status(422).json(err));
});

router.get("/deploy", isAuthenticated, function(req, res) {
  console.log("req.user: ", req.user);
  db.Timeblocks.findAll() // Joins User to Timeblock! And scrapes all the seqeulize stuff off
    .then((dbModel) => {
      console.log(dbModel);
      res.render("deploy", { user: req.user, Timeblocks: dbModel });
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
 * Forum Page -
 * Notice loading our posts, with that include!
 */
// router.get("/deploy", isAuthenticated, function(req, res) {
//   db.Post.findAll({ raw: true, include: [db.User] }) // Joins User to Posts! And scrapes all the seqeulize stuff off
//     .then((dbModel) => {
//       res.render("deploy", { user: req.user, posts: dbModel });
//     })
//     .catch((err) => res.status(422).json(err));
// });

/**
 * Generic Error Page
 */
router.get("*", function(req, res) {
  res.render("errors/404", { user: req.user });
});

module.exports = router;
