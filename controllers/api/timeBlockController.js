const db = require("../../models");
const router = require("express").Router();

/**
 * Timeblock Read - All
 */
router.get("/", function (req, res) {
    db.Timeblock.findAll(req.query)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

/**
 * Timeblock Read - One
 */
router.get("/:id", function (req, res) {
    db.Timeblock.findById(req.params.id)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

/**
 * Timeblock - Create
 * Notice how we are using the 'withPassword' scope.
 * This allows for us to modify a Timeblock's password, as defined in the Timeblock model
 */
router.post("/", function (req, res) {
    db.Timeblock
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

/**
 * Timeblock - Update
 */
router.put("/:id", function (req, res) {
    db.Timeblock.update(req.body, { where: { id: req.params.id } })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

/** 
 * Timeblock - Delete
 */
router.delete("/:id", function (req, res) {
    db.Timeblock.destroy({ where: { id: req.params.id } })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

module.exports = router;
