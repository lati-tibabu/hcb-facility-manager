const userRoute = require("./user.route");
const authRoute = require("./auth.route");

const router = require("express").Router();

router.use("/auth", authRoute);
router.use("/users", userRoute);

module.exports = router;