var mongoose=require("mongoose");
//Schema Setup
var songSchema = new mongoose.Schema({
    song:String,
    price:String,
    url:String,
    cover_image:String,
    artists:String,
    comments:[
       {
          type: mongoose.Schema.Types.ObjectId,
          ref:"comment"
       } 
    ]
});
module.exports = mongoose.model("Song",songSchema);