var mongoose=require("mongoose");
//Schema Setup
var songSchema = new mongoose.Schema({
    song:String,
    price:String,
    url:String,
    cover_image:String,
    artists:String,
    payments:[
       {
          type: mongoose.Schema.Types.ObjectId,
          ref:"payment"
       } 
    ]
});
module.exports = mongoose.model("Song",songSchema);