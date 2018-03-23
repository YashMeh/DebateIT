var express=require("express"),
    bodyParser=require("body-parser"),
    mongoose=require("mongoose"),
    users=require("./models/user"),
    posts=require("./models/post"),
    seedDB=require("./seed"),
    passport=require("passport"),
    LocalStrategy=require("passport-local"),
    passportLocalMongoose=require("passport-local-mongoose"),
    comment=require("./models/comment");

seedDB();
 var app=express();
 app.set("view engine","ejs");
 app.use(bodyParser.urlencoded({extended:true}));
 app.use(express.static("public"));
 mongoose.connect("mongodb://localhost/hola");    
app.use(require('express-session')({
	secret:"yash123",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(users.authenticate()));
passport.serializeUser(users.serializeUser());
passport.deserializeUser(users.deserializeUser());
//middleware to every page
app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	next();
});


//IMPORTING ROUTES
var postRoutes=require("./routes/postRoute");
var userRoutes=require("./routes/userRoute");
var commentRoutes=require("./routes/commentRoute");
app.use(postRoutes);
app.use(userRoutes);
app.use(commentRoutes);
















//Server started
app.listen(3000,function(err){
	if(err){
		console.log(err);

	}
	else{
		console.log("Server has started");
	}
}); 






