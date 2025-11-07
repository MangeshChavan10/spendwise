const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");
const { protect } = require("../middleware/authMiddleware");


router.post("/", protect, expenseController.addExpense);         
router.get("/", protect, expenseController.getAllExpenses);      
router.get("/category-totals",protect,expenseController.getCategoryTotals);  
router.get("/:id", protect, expenseController.getExpenseById);
router.put("/:id", protect, expenseController.updateExpense);       
router.delete("/:id", protect, expenseController.deleteExpense);



module.exports = router;
