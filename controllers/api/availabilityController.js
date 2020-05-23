const db = require("../../models");
const router = require("express").Router();

/**
 * Availability - Read All
 */
router.get("/", function(req, res) {
    db.Availability.findAll(req.query)
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));
});

/**
 * Availability - Read One
 */
router.get("/:id", function(req, res) {
    db.Availability.findById(req.params.id)
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));
});

/**
 * Availability - Create
 * Notice how we are also taking in the User Id! Important!
 */
router.post("/", function(req, res) {
    db.Availability.create({
            UserId: req.user.id,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
        })
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));
});

/**
 * Availability - Update
 */
router.put("/:id", function(req, res) {
    db.Availability.update(req.body, { where: { id: req.params.id } })
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));
});

/**
 * Availability - Delete
 */
router.delete("/:id", function(req, res) {
    db.Availability.destroy({ where: { id: req.params.id } })
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));
});

// Defining methods for the booksController
module.exports = router;