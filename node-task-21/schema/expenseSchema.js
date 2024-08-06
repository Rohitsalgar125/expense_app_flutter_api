const mongoose = require("mongoose");


const expenseSchema = mongoose.Schema({
    amount :{
        type : Number ,
        required : true
    },
    description : {
        type : String ,
        required : true
    }
},{
    versionKey : false ,
    timestamps : true
})


module.exports = mongoose.model('expense',expenseSchema);
