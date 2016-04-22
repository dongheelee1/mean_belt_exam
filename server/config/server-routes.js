var polls = require('./../controllers/polls.js')

module.exports = function(app){
	app.post('/registerUser', function(req, res){
		polls.registerUser(req, res)
	})
	app.post('/loginUser', function(req, res){
		polls.loginUser(req, res)
	})
	app.post('/addPoll', function(req, res){
		polls.addPoll(req, res)
	})
	app.get('/getPolls', function(req, res){
		polls.getPolls(req, res)
	})
	app.get('/deletePoll/:id', function(req, res){
		polls.deletePoll(req, res)
	})
	app.get('/getPollProfile/:id', function(req, res){
		polls.getPollProfile(req, res)
	})
	app.post('/voteOption', function(req, res){
		polls.voteOption(req, res)
	})
}