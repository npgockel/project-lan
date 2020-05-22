const db = require("../../models");
const router = require("express").Router();

/**
 * Deploy - Read All
 */
router.get("/", function(req, res) {
  db.Deploy.findAll(req.query)
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

/**
 * Deploy - Read One
 */
router.get("/:id", function(req, res) {
  db.Deploy.findById(req.params.id)
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

/**
 * Deploy - Create
 * Notice how we are also taking in the User Id! Important!
 */
router.post("/", function(req, res) {
  db.Deploy.create({
    UserId: req.user.id,
    ...req.body,
  })
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

/**
 * Deploy - Update
 */
router.put("/:id", function(req, res) {
  db.Deploy.update(req.body, { where: { id: req.params.id } })
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

/**
 * Deploy - Delete
 */
router.delete("/:id", function(req, res) {
  db.Deploy.destroy({ where: { id: req.params.id } })
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

// Defining methods for the booksController
module.exports = router;
