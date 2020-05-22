const router = require("express").Router();
// Import our controllers
const deployRoutes = require("./deployController");
const userRoutes = require("./usersController");
const availabilityRoutes = require("./availabilityController");

// Hook up to the router
router.use("/deploy", deployRoutes);
router.use("/users", userRoutes);
router.use("/availability", availabilityRoutes);

// Export the router
module.exports = router;
