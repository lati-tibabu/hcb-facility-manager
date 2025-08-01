const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const siteRoute = require("./site.route");
const router = require("express").Router();

router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/sites", siteRoute);

module.exports = router;