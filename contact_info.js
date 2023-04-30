const mongose = require("mongoose");

const ContactInfo = mongose.Schema({
	usernamecont:
	{
		type:String,
   		minLength:4,
    	maxlength:50,
    	required:true,
    	index:
    	{
     	 	unique:true,
     	 	dropDups:true
    	}
	},
	emailcont:
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
    messagecont:
	{
		type:String,
	    minLength:4,
	    maxlength:500,
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

Con = mongose.model("Con" , ContactInfo);
module.exports = Con;