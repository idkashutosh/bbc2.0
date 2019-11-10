var express = require("express");
var router =express.Router();
var passport = require("passport");
var user = require("../models/user");
var song = require("../models/song");

//root route
router.get("/",function(req,res){
    res.render("landing");
});

//========================================
//Auth Routes
//========================================
//Show register form
router.get("/register", function(req,res){
    res.render("register",{page: 'register'});
   })  ;  
   
   //sign up logic
   router.post("/register", function(req,res){
       var newuser=new user(
         {
           username: req.body.username,
           firstname: req.body.firstname,
           lastname:req.body.lastname,
           email:req.body.email
          });
     user.register(newuser, req.body.password, function(err, user){
      if(err){
          console.log(err);
          return res.render("register", {error: err.message});
      } 
       passport.authenticate("local")(req, res,function(){
             req.flash("success","Welcome to AI MUSIC"+ user.username);
             res.redirect("/songs");
       });
     });
   });
   
   //login routes
   //show form
   router.get("/login",function(req,res){
       res.render("login",{page: 'login'});
   });
   //login logic
   router.post("/login",passport.authenticate("local",
      {
        successRedirect:"/songs",
        failureRedirect:"/login"
      }),   
      function(req,res){
   
   });
   
   // log out route
   router.get("/logout", function(req, res){
    req.logout();
    req.flash("success","Logged You Out!");
    res.redirect("/songs");
   });
 
   module.exports = router;