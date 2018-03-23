var express=require("express");
var router=express.Router();
var Post=require("../models/post");


//default route
router.get("/",function(req,res){
	res.redirect("/posts");
});

//show all posts
router.get("/posts",function(req,res){
	Post.find({},function(err,posts){
		if(err){
			res.send("Sorry some problem occured while showing the posts.");        //====================//WORK ON ERROR HANDLING
		}
		else{
			res.render("posts/home",{posts:posts});
		}
	});

});
//show specific post
router.get("/posts/:id",function(req,res){
	Post.findById(req.params.id).populate("comments").exec(function(err,found_post){
		if(err){
			console.log(err);
		}
		else{
			console.log(found_post);
			res.render("posts/show",{found_post:found_post});
		}
	});
});

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	} 
	res.redirect("/login");
}

module.exports=router;