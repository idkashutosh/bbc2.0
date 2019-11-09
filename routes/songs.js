var express = require("express");
var router = express.Router();
var song = require("../models/song");
var middleware = require("../middleware");

//INDEX - show all songs
router.get("/",function(req,res){
    //songs from db 
    song.find({},function(err,allsongs){
       if(err){
           console.log(err);
       }
       else{
        res.render("songs/index",{songs:allsongs,page: 'songs'});
       }
   });
});

//SHOW - show more info about one song
router.get("/:id",function(req,res){
    //find the song with provided id
    song.findById(req.params.id).populate("comments").exec(function(err,foundsong){
        if(err){
            console.log(err);
        }
        else{
            console.log(foundsong);
             //Render show template of the id
             res.render("songs/show", {song : foundsong});
        }
    });
});

module.exports = router;