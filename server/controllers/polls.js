var mongoose = require('mongoose')
var Poll = mongoose.model('Poll')
var User = mongoose.model('User')

module.exports = (function() {
	return{
		registerUser: function(req, res){
			var userInstance = new User()
			userInstance.user = req.body.name2
			userInstance.email = req.body.email

			userInstance.save(function(err, results){
				if(err){
					console.log(err)
				}else{
					console.log(results)
					res.json(results)
				}
			})
		}, 
		loginUser: function(req, res){
			console.log(req.body.name1)
			User.find({user: req.body.name1}, function(err, results){
				if(err){
					console.log(err)
				}else{
					console.log('success')
					console.log(results)
					res.json(results)
				}
			})
		}, 
		addPoll: function(req, res){
			console.log("in polls server controller", req.body)
			var questionInstance = new Poll()

			questionInstance.question = req.body[0].name
			questionInstance.user = req.body[1].username
			option1 = req.body[0].optionOne
			option2 = req.body[0].optionTwo
			option3 = req.body[0].optionThree
			option4 = req.body[0].optionFour
			questionInstance.options = [{option: option1}, {option: option2}, {option: option3}, {option: option4}]
			console.log(questionInstance)

			questionInstance.save(function(err, results){
				if(err){
					console.log(err)
				}else{
					console.log(results)
					res.json(results)
				}
			})
		}, 
		getPolls: function(req, res){
			Poll.find({}, function(err, results){
				if(err){
					console.log(err)
				}else{
					console.log(results)
					res.json(results)
				}
			})
		}, 
		deletePoll: function(req, res){
			console.log('wowowowow')
			console.log(req.params.id)
			Poll.remove({_id: req.params.id}, function(err, results){
				if(err){
					console.log(err)
				}else{
					console.log(results)
					res.json(results)
				}
			})
		}, 

		getPollProfile: function(req, res){
			console.log('in getPollProfile')
			console.log(req.params)
			Poll.find({_id: req.params.id}, function(err, results){
				if(err){
					console.log(err)
				}else{
					console.log(results)
					res.json(results)
				}
			})
		}, 

		voteOption: function(req ,res){
			console.log('in voteOption profile')
			console.log(req.body.vote += 1)
			console.log(req.body._id)
			vote = req.body.vote

			var query = {'options._id': req.body._id}
			Poll.update(query, {$inc: {'options.$.vote': 1}}, function(err, results){
				if(err){
					console.log(err)
				}else{
					console.log(results)
					res.json(results)
				}
			})
		}
	}
})()	