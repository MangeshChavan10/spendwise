const express = require("express");

const router = express.Router();
const subscriptionController = require("../controllers/subscriptionController");
const {protect} = require("../middleware/authMiddleware");

router.post("/",protect, subscriptionController.addSubscription);
router.get("/",protect, subscriptionController.getSubscription);
router.delete("/deleteSubscription",protect, subscriptionController.deleteSubscription);


module.exports = router