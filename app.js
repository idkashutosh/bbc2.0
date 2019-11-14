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
    payment    = require("./models/payment"),
    user       = require("./models/user");
    seedDB     = require("./seeds");
//requiring routes
var paymentroutes    = require("./routes/payments"),
    songroutes = require("./routes/songs"),
    indexroutes       = require("./routes/index");    

    // mongoose.connect("mongodb://localhost/aisongs");  
    const options={
        keepAlive: 1,
        useUnifiedTopology: true,
        useNewUrlParser: true
    };
    mongoose.connect("mongodb+srv://ankit:passraj@aimusic-es8pe.mongodb.net/test?retryWrites=true&w=majority",options).then(() =>console.log('DB connected'));

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
    app.use("/songs/:id/payments",paymentroutes);
    app.use("/songs", songroutes);
    const PORT = process.env.PORT || 3000;
    app.listen(PORT,function(){
        console.log("AI SONGS app server has started");
    });
