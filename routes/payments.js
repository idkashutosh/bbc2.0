var express = require("express");
var router =express.Router({mergeParams: true});
var song = require("../models/song");
var payment = require("../models/payment");
var middleware = require("../middleware");

//===========================================================
//Payments ROUTES
//===========================================================
//payments new
router.get("/new",middleware.isloggedin, function(req,res){
    //finding song  by id
  song.findById(req.params.id, function(err,song){
    if(err){
        console.log(err);
    }
    else{
        res.render("payment",{song: song});
    }
  });
});
//Filling payment details 
router.post("/new", middleware.isloggedin,function(req,res){
   //lookup song using id
    song.findById(req.params.id, function(err, song){
       if(err){
           console.log(err);
           req.flash("success","Payment done successfully");
           res.redirect("/songs");
       }
       else{
           //Saving payment details
           payment.create(req.body.payment, function(err, payment){
              if(err){
                  req.flash("error","Something went wrong");
                  console.log(err);
              }
              else{
                  //add username and id to payment
                  payment.author.id = req.user._id;
                  payment.author.username = req.user.username;
                  payment.save();
                  //connect payment details
                  song.payments.push(payment);
                  song.save();
                  req.flash("success","Payment done Successfully ");
                     //redirect to song show page
                  res.redirect("/songs/"+song._id);
              }
           });
       }
    });
});

module.exports = router;