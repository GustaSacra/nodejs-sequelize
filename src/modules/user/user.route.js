const { Router } = require("express");
const UserController = require("./user.controller");

const router = Router();

router.post("/", UserController.store);
router.get("/", UserController.index);
router.get("/:id", UserController.show);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.destroy);

module.exports = router;
