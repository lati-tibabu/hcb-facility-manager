const assignmentController = require("../../controllers/v1/user-site-assignment.controller");
const router = require("express").Router();

router.post("/assign", assignmentController.assignUserToSite);
router.delete("/unassign", assignmentController.unassignUserFromSite);
router.get("/users/:siteId", assignmentController.getUsersForSite);
router.get("/sites/:userId", assignmentController.getSitesForUser);

module.exports = router;