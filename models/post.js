var mongoose=require("mongoose");

var postSchema=new mongoose.Schema({
	title:String,
	body:String,
	date:{type:Date,default:Date.now},
	comments:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:"comment"
	}]
});

module.exports=mongoose.model("posts",postSchema);