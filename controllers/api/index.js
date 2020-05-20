const router = require("express").Router();
// Import our controllers
const postRoutes = require("./postsController");
const userRoutes = require("./usersController");
const availabilityRoutes = require("./availabilityController");
const timeBlockRoutes = require("./timeblockController");

// Hook up to the router
router.use("/posts", postRoutes);
router.use("/users", userRoutes);
router.use("/availability", availabilityRoutes);
router.use("/timeblocks", timeBlockRoutes);

// Export the router
module.exports = router;
