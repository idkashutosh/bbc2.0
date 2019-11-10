var express    = require("express"),
    app        = express(),
    bodyparser = require("body-parser"),
    mongoose   = require("mongoose"),
    flash      = require("connect-flash");
    passport   = require("passport"),
    moment     = require("moment"),
    localstrategy = require("passport-local"),
    methodoverride = require("method-override");
    song = require("./models/song"),
    comment    = require("./models/comment"),
    user       = require("./models/user");
    seedDB     = require("./seeds");
//requiring routes
var commentroutes    = require("./routes/comments"),
    songroutes = require("./routes/songs"),
    indexroutes       = require("./routes/index");    

    mongoose.connect("mongodb://localhost/aisongs");    
    app.use(express.static("public"));
    app.use(methodoverride("_method"));
    app.use(flash());
    app.set("view engine", "ejs");
    app.use(bodyparser.urlencoded({extended:true}));
    seedDB(); // seed database // 
    // app.locals.moment = require("moment");
    //Passport config
    app.use(require("express-session")({
       secret: "now you see me",
       resave: false,
       saveUninitialized:false
    }));
    app.use(passport.initialize());
    app.use(passport.session())
    passport.use(new localstrategy(user.authenticate()));
    passport.serializeUser(user.serializeUser());
    passport.deserializeUser(user.deserializeUser());
    
    //checking that user is logged in and returning the users details to every routes as middleware
    app.use(function(req,res , next){
      res.locals.currentuser = req.user;
      res.locals.error= req.flash("error");
      res.locals.success= req.flash("success");
      next();
    });
    
    app.use(indexroutes);
    app.use("/songs/:id/comments",commentroutes);
    app.use("/songs", songroutes);
    
    app.listen(3000,function(){
        console.log("AI SONGS app server has started");
    });