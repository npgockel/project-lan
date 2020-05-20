const db = require("../../models");
const router = require("express").Router();

/**
 * Post - Read All
 */
router.get("/", function(req, res) {
  db.Timeblocks.findAll(req.query)
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

/**
 * TImeblocks - Read One
 */
router.get("/:id", function(req, res) {
  db.Timeblocks.findById(req.params.id)
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

/**
 * Timeblocks - Create
 * Notice how we are also taking in the User Id! Important!
 */
router.post("/", function(req, res) {
  db.Timeblocks.create({
    UserId: req.user.id,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
  })
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

/**
 * Timeblocks - Update
 */
router.put("/:id", function(req, res) {
  db.Timeblocks.update(req.body, { where: { id: req.params.id } })
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

/**
 * Timeblocks - Delete
 */
router.delete("/:id", function(req, res) {
  db.Timeblocks.destroy({ where: { id: req.params.id } })
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

// Defining methods for the booksController
module.exports = router;
