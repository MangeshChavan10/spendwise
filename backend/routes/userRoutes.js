const express = require("express");

const router = express.Router();
const userController = require("../controllers/userController");
const {protect} = require("../middleware/authMiddleware");

router.post('/signup',userController.signUp)
router.post('/login',userController.loginUser)
router.get("/profile", protect, userController.getUserProfile);
router.put("/update", protect, userController.updateUser);
router.delete("/delete", protect, userController.deleteUser);


module.exports = router