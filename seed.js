var mongoose=require("mongoose");
var posts=require("./models/post");
var comment=require("./models/comment");
var user=require("./models/user");


data=[
    {
	title:"Post-1",
	body:"Body of Post1" 

    },
    {
	title:"Post-2",
	body:"Body of Post2" 

    },
    {
	title:"Post-3",
	body:"Body of Post3" 

    }

];
function seedDB(){
	//remove all posts
	user.remove({},function(err){
		if(err){
			console.log(err);
		}
		else{
			console.log("Users Removed");
		}
	});
	posts.remove({},function(err){
		if(err){
			console.log(err);
		}
		else{
			console.log("Removed Posts");
			//Create posts
			data.forEach(function(post){
				posts.create(post,function(err,created_posts){
					if(err){
						console.log(err);
					}
					else{
						console.log("Added Posts");
						
						//Create Comments
						comment.create({
							text:"wuff wuff wuff",
							author:"dogo"
						},function(err,created_comment){
							if(err){
								console.log(err);
							}
							else{
								console.log("Comment Created");
								created_posts.comments.push(created_comment);
								created_posts.save();
								console.log(created_posts);
								
							}
						});
					}
				})
			})

		}
	});
}

module.exports=seedDB;