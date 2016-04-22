var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var PollSchema = new mongoose.Schema({
	question: String, 
	user: String,
	created_at: {type: Date, default: Date.now},
	options: [{
		option: String, 
		vote: {type: Number, default: 0}, 
		created_at: {type: Date, default: Date.now}
	}]
})

var UserSchema = new mongoose.Schema({
	user: String,
	email: String,  
	created_at: {type: Date, default: Date.now} 
})

mongoose.model('Poll', PollSchema)
mongoose.model('User', UserSchema)
