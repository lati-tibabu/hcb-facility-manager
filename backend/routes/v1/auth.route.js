const authController = require("../../controllers/v1/auth.controller");
const router = require("express").Router();

router.post("/", authController.authenticateUser);

module.exports = router;