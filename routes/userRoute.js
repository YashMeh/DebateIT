var express=require("express"),
    mongoose=require("mongoose"),
    passport=require("passport"),
    bodyParser=require("body-parser"),
    LocalStrategy=require("passport-local"),
    User         =require("../models/user"),
    passportLocalMongoose=require("passport-local-mongoose");

var router=express.Router();



//===================================
//Auth ROUTES
//===================================
//Show signup form
router.get('/register',function(req,res){
	res.render('register');

});
//handling user-signup
router.post('/register',function(req,res){
	
	User.register(new User({username:req.body.username}),req.body.password,function(err,user){
		if(err){
			console.log(err);
			return res.render('register_error',{err:err});
		}
		passport.authenticate("local")(req,res,function(){
			res.redirect("/posts");
		});


	});

	
});
//LOGIN ROUTES
//render login form

router.get("/login",function(req,res){
	res.render('login');
});

//matching up login credentials
//middleware
router.post("/login",passport.authenticate("local",{
	successRedirect:"/posts",
	failureRedirect:"/login"
}),function(req,res){

});
//logout===========
router.get('/logout',function(req,res){
	req.logout();
	res.redirect('/')
});

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	} 
	res.redirect("/login");
}

module.exports=router;