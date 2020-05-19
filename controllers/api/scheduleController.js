const db = require("../../models");
const router = require("express").Router();

/**
 * Schedule Read - All
 */
router.get("/", function (req, res) {
  db.Schedule.findAll(req.query)
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

/**
 * Schedule Read - One
 */
router.get("/:id", function (req, res) {
  db.Schedule.findById(req.params.id)
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

/**
 * Schedule - Create
 * Notice how we are using the 'withPassword' scope.
 * This allows for us to modify a Schedule's password, as defined in the Schedule model
 */
router.post("/", function (req, res) {
  db.Schedule.scope("withPassword")
    .create(req.body)
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

/**
 * Schedule - Update
 */
router.put("/:id", function (req, res) {
  db.Schedule.update(req.body, { where: { id: req.params.id } })
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

/**
 * Schedule - Delete
 */
router.delete("/:id", function (req, res) {
  db.Schedule.destroy({ where: { id: req.params.id } })
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

module.exports = router;
