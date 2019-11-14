var mongoose = require("mongoose");
var song = require("./models/song");
var payment   = require("./models/payment");

var data = [ 
        {  
           song:"Afreen Afreen",
           url:"http://hck.re/Rh8KTk",
           artists:"Rahat Fateh Ali Khan, Momina Mustehsan",
           cover_image:"http://hck.re/kWWxUI",
           price:"45"
        },
        {  
         song:"Tajdar e haram",
         url:"http://hck.re/wxlUcX",
         artists:"Atif Aslam",
         price:"50",
         cover_image:"http://hck.re/5dh4D5"
        },
        {  

           song:"Aik Alif",
           url:"http://hck.re/ZeSJFd",
           artists:"Saieen Zahoor, Noori",
           price:"50",
           cover_image:"http://hck.re/3Cm0IX"
        },
        {  
           song:"Aaj Rung",
           url:"http://hck.re/H5nMm3",
           artists:"Amjad Sabri,  Rahat Fateh Ali Khan",
           price:"60",
           cover_image:"http://hck.re/U1bRnt"
        },
        {  
           song:"Ae dil",
           url:"http://hck.re/2nCncK",
           artists:"Ali Zafar, Sara Haider",
           price:"55",
           cover_image:"http://hck.re/eLtjUb"
        },
        {  
           song:"Man Amadeh am",
           url:"http://hck.re/epOzj9",
           artists:"Atif Aslam, Gul Panrra",
           price:"40",
           cover_image:"http://hck.re/KvT2Vv"
        },
        {  
           song:"Bewajah",
           url:"http://hck.re/YkbDDP",
           artists:"Nabeel Shaukat Ali",
           price:"55",
           cover_image:"http://hck.re/N29EEt"
        },
        {  
           song:"Dinae Dinae",
           url:"http://hck.re/dMquYY",
           artists:"Harshadeep Kaur",
           price:"45",
           cover_image:"http://hck.re/6l9QqH"
        },
        {  
           song:"Tera woh pyar",
           url:"http://hck.re/64Tzod",
           artists:"Momina Mustehsan, Asim Azhar",
           price:"55",
           cover_image:"http://hck.re/rlYqJY"
        },
        {  
           song:"Shamaan Pai gaiyan",
           url:"http://hck.re/VhtQGh",
           artists:"Rachel Viccaji, Kashif Ali",
           price:"64",
           cover_image:"http://hck.re/gs0grk"
        }
];
function seedDB(){
    //Remove all campgrounds
    song.remove({},function(err){
        if(err){
            console.log(err);
        }
       console.log("removed songs");
        //add a few campgrounds
        data.forEach(function(seed){
        song.create(seed, function(err, song){
           if(err){
               console.log(err);
           }
           else{
               console.log("We added new song");
            };
        });
    });    
});
}
module.exports = seedDB;
