const express = require("express");
const expenseRoute = express.Router();
const expenseController = require("../controller/expenseController");
const expenseValidation = require("../validation/expenseValidation");



expenseRoute.post('/insert', expenseValidation.addExpenseValidation , expenseController.addExpense);







module.exports = expenseRoute;