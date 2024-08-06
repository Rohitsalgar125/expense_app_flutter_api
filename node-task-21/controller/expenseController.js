const expense = require('../schema/expenseSchema');

const addExpense = async (req, res) => {
    let payload, insertedData;
    try {
        payload = req.body;
        insertedData = await expense.create(payload);
        if (insertedData) {
            res.send({ status: 1, response: "expense added" })
        }

    } catch (error) {
        res.send({ status: 0, response: error.message })
    }
}


module.exports = {
    addExpense
}