const db = require("../../models");
const router = require("express").Router();

/**
 * userSchedule - Read All
 */
router.get("/", function(req, res) {
  db.userSchedule
    .findAll(req.query)
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

/**
 * userSchedule - Read One
 */
router.get("/:id", function(req, res) {
  db.userSchedule
    .findById(req.params.id)
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

/**
 * userSchedule - Create
 * Notice how we are also taking in the User Id! Important!
 */
router.post("/", function(req, res) {
  db.User.findByPk(req.user.id)
    .then((user) => {
      db.Availability.findByPk(req.body.availability).then((availability) => {
        if (availability.ScheduleId) {
          db.Schedule.findByPk(availability.ScheduleId).then((schedule) => {
            user.addSchedule(schedule).then((dbModel) => {
              res.json(dbModel);
            });
          });
        } else {
          db.Schedule.create({
            start_time: availability.start_time,
            end_time: availability.end_time,
          }).then((newSchedule) => {
            db.Availability.update(
              {
                ScheduleId: newSchedule.id,
              },
              {
                where: {
                  id: availability.id,
                },
              }
            ).then(() => {
              user.addSchedule(newSchedule).then((dbModel) => {
                res.json(dbModel);
              });
            });
          });
        }
      });
    })

    .catch((err) => res.status(422).json(err));
});

/**
 * userSchedule - Update
 */
router.put("/:id", function(req, res) {
  db.userSchedule
    .update(req.body, { where: { id: req.params.id } })
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

/**
 * userSchedule - Delete
 */
router.delete("/:id", function(req, res) {
  db.userSchedule.destroy({ where: { id: data } })
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

// Defining methods for the booksController
module.exports = router;
