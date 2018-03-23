var express=require("express");
var router=express.Router();
var Post=require("../models/post");
var comment=require("../models/comment");



router.get("/posts/:id/comment/new",isLoggedIn,function(req,res){
	Post.findById(req.params.id,function(err,found_post){
		if(err){
			console.log(err);
		}
		else{
		res.render("comments/new",{found_post:found_post});
	}

	});
});

router.post("/posts/:id/comment",isLoggedIn,function(req,res){
	//find posts
	Post.findById(req.params.id,function(err,found_post){
		if(err){
			console.log(err);
		}
		else{
			comment.create(req.body.comment,function(err,created_comment){
				if(err){
					console.log(err);
				}
				else{
					//add username and id to comment
					created_comment.author.id=req.user._id;
					created_comment.author.username=req.user.username;
					//save comment
					created_comment.save();
					found_post.comments.push(created_comment);
					found_post.save();
					res.redirect("/posts/"+found_post._id);
				}

			})

		}
	})
	//create comment
	//connect comment to post
	//redirect to /posts
});

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	} 
	res.redirect("/login");
}

module.exports=router;

