const siteController = require("../../controllers/v1/site.controller");
const router = require("express").Router()

router.post("/", siteController.createSite);
router.get("/", siteController.getSites);
router.get("/:id", siteController.getSiteById);
router.put("/:id", siteController.updateSite);
router.delete("/:id", siteController.deleteSite);

module.exports = router;