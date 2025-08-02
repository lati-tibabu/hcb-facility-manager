const userController = require("../../controllers/v1/user.controller");
const router = require("express").Router();
const authMiddleware = require("../../middlewares/auth.middleware");

router.post("/", userController.createUser);
router.get("/", /*authMiddleware.authMiddleware, authMiddleware.isAdmin,*/ userController.getUsers);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;