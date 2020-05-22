const db = require("../../models");
const router = require("express").Router();

/**
 * userSchedule - Read All
 */
router.get("/", function(req, res) {
  db.user_Schedule.findAll(req.query)
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

/**
 * userSchedule - Read One
 */
router.get("/:id", function(req, res) {
  db.user_Schedule.findById(req.params.id)
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

/**
 * userSchedule - Create
 * Notice how we are also taking in the User Id! Important!
 */
router.post("/", function(req, res) {
  db.user_Schedule.create({
      UserId: req.user.id,
      Availability: 
  })
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

/**
 * userSchedule - Update
 */
router.put("/:id", function(req, res) {
  db.user_Schedule.update(req.body, { where: { id: req.params.id } })
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

/**
 * userSchedule - Delete
 */
router.delete("/:id", function(req, res) {
  db.userSchedule.destroy({ where: { id: req.params.id } })
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

// Defining methods for the booksController
module.exports = router;
