const mongose = require("mongoose");

const SubscribeInfo = mongose.Schema({
	emailll:
	{
		type:String,
	    minLength:9,
	    maxlength:100,
	    required:true,
	    index:
	    {
	      unique:true,
	      dropDups:true
	    }
	},
    joinDate:
    {
      type:Date,
      default : Date.now
    }
})

Sub = mongose.model("Sub" , SubscribeInfo);
module.exports = Sub;