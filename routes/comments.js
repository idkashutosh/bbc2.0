var express = require("express");
var router =express.Router({mergeParams: true});
var song = require("../models/song");
var comment = require("../models/comment");
var middleware = require("../middleware");

//===========================================================
//Comments ROUTES
//===========================================================
//comments new
router.get("/new",middleware.isloggedin, function(req,res){
    //finding song  by id
  song.findById(req.params.id, function(err,song){
    if(err){
        console.log(err);
    }
    else{
        res.render("comments/new",{song: song});
    }
  });
});
//comments create
router.post("/", middleware.isloggedin,function(req,res){
   //lookup song using id
    song.findById(req.params.id, function(err, song){
       if(err){
           console.log(err);
           res.redirect("/songs");
       }
       else{
           //create new comment
           comment.create(req.body.comment, function(err, comment){
              if(err){
                  req.flash("error","Something went wrong");
                  console.log(err);
              }
              else{
                  //add username and id to comment
                  comment.author.id = req.user._id;
                  comment.author.username = req.user.username;
                  comment.save();
                  //connect new comment to song
                  song.comments.push(comment);
                  song.save();
                  req.flash("success","Successfully added comment");
                     //redirect to song show page
                  res.redirect("/songs/"+song._id);
              }
           });
       }
    });
});

// EDIT COMMENT ROUTE
router.get("/:comment_id/edit",middleware.checkcommentownership , function(req, res){
    comment.findById(req.params.comment_id, function(err, foundcomment){
     if(err){
         res.redirect("back");
     }else{
        res.render("comments/edit",{song_id: req.params.id, comment: foundcomment})
     }
    });
});

//Update comment route
router.put("/:comment_id",middleware.checkcommentownership ,function(req,res){
  comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedcomment){
    if(err){
        res.redirect("back");
    }
    else{
        res.redirect("/songs/"+req.params.id);
    }
  });
});

//Destroy comment route
router.delete("/:comment_id", middleware.checkcommentownership,function(req, res){
  comment.findByIdAndRemove(req.params.comment_id, function(err){
     if(err){
         res.redirect("back");
     }
     else{
         req.flash("success","Comment Deleted");
         res.redirect("/songs/"+req.params.id)
     }
  });
});

module.exports = router;