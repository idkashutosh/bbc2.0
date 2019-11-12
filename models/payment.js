var mongoose = require("mongoose");


var paymentschema= new mongoose.Schema({
        cardno : Number,
        name :String,
        cvv : Number,
        year : Number,
        author: {
                id : {
                        type: mongoose.Schema.Types.ObjectId,
                        ref:"user"
                },
                username : String
        }  
});

module.exports = mongoose.model("payment",paymentschema);