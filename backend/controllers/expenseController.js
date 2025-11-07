const Expense = require("../models/expenseModel");

exports.addExpense = async (req, res) => {
  try {
    const { title,amount,type,category } = req.body;

    if (!title || !amount) {
      return res.status(400).json({
        status: "fail",
        msg: "Title and amount are required",
      });
    }

    const expense = await Expense.create({
      user: req.user.id,
      title,
      category,
      amount,
      type,
    });

    res.status(201).json({
      status: "success",
      msg: "Expense added successfully",
      data: expense,
    });
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
};


exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({
      date: -1,
    });

    res.status(200).json({
      status: "success",
      results: expenses.length,
      data: expenses,
    });
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
};

exports.getCategoryTotals = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const mongoose = require('mongoose');
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const totals = await Expense.aggregate([
      { $match: { user: userObjectId } },
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" },
        },
      },
      { $sort: { totalAmount: -1 } },   
    ]);

    res.status(200).json(totals);
  } catch (error) {
    console.error("Error in getCategoryTotals:", error);
    res.status(500).json({ 
      status: "error",
      message: "Error fetching category totals" 
    });
  }
};




exports.getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!expense) {
      return res.status(404).json({
        status: "fail",
        msg: "Expense not found",
      });
    }

    res.status(200).json({ status: "success", data: expense });
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
};



exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!expense) {
      return res.status(404).json({
        status: "fail",
        msg: "Expense not found",
      });
    }

    res.status(200).json({
      status: "success",
      msg: "Expense updated successfully",
      data: expense,
    });
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
};


exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!expense) {
      return res.status(404).json({
        status: "fail",
        msg: "Expense not found",
      });
    }

    res.status(200).json({
      status: "success",
      msg: "Expense deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
};
