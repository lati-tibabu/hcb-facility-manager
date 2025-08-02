const siteController = require("../../controllers/v1/site.controller");
const router = require("express").Router()
const authMiddleware = require("../../middlewares/auth.middleware");

// router.use(authMiddleware.authMiddleware);

router.post("/", /*authMiddleware.isAdmin,*/ siteController.createSite);
router.get("/", siteController.getSites);
router.get("/:id", siteController.getSiteById);
router.put("/:id", siteController.updateSite);
router.delete("/:id", siteController.deleteSite);

module.exports = router;