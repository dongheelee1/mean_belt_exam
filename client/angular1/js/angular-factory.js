username = [];
myApp.factory('HomeFactory', function($http){
	var factory={};
	var users = [];

	factory.registerUser = function(user, callback){
		$http.post('/registerUser', user).success(function(){
			console.log('registerUser angular fact')
		});
	}

	factory.loginUser = function(user, callback){
		$http.post('/loginUser', user).success(function(data){
			users = data
			username = data[0].user
			callback(username);
		});
	}
	return factory;

})

myApp.factory('NewPollFactory', function($http){
	var factory = {};

	factory.addPoll = function(question, username, callback){
		console.log('in addpoll factory')
		var data = [question, {username: username}]
		console.log(data)
		$http.post('/addPoll', data).success(function(data){
			console.log('addPoll factory');
		})
	}
	return factory
})

myApp.factory('DashboardFactory', function($http){
	var factory = {};
	factory.getPolls = function(callback){

		$http.get('/getPolls').success(function(data){
			console.log('in DashboardFactory')
			callback(data)
		})
	}
	factory.deletePoll = function(poll, callback){
		$http.get('/deletePoll/'+poll._id).success(function(data){
			console.log('deletePoll in DashboardFactory')
			callback(data)
		})
	}
	return factory;
})

myApp.factory('ProfileFactory', function($http){
	var factory = {};

	factory.getPollProfile = function(id, callback){
		console.log(id)
		console.log('hi')

		$http.get('/getPollProfile/'+id).success(function(data){
			callback(data)
		})
	}

	factory.voteOption = function(o, callback){
		console.log(o)
		$http.post('/voteOption', o).success(function(data){
			callback(data)
		})
	}
	return factory;
})