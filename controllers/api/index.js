const router = require("express").Router();
// Import our controllers
const postRoutes = require("./postsController");
const userRoutes = require("./usersController");
const scheduleRoutes = require("./scheduleController");
const timeBlockRoutes = require("./timeBlockController");

// Hook up to the router
router.use("/posts", postRoutes);
router.use("/users", userRoutes);
router.use("/schedule", scheduleRoutes);
router.use("/timeblock", timeBlockRoutes);

// Export the router
module.exports = router;
