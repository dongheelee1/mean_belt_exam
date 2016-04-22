myApp.controller('Home', function($scope, $cookies, $location, HomeFactory){

	$scope.registerUser = function(){
		HomeFactory.registerUser($scope.user, function(){
			console.log('registerUser angular cont')
			$scope.user = {}
		})	
	}

	$scope.loginUser = function(){
		HomeFactory.loginUser($scope.user, function(data){
			if(data){
				username = $cookies.get('username')
				$cookies.put('username', data)
				$rootscope = username
				console.log('what cookie', $rootscope)
				$location.path('/Dashboard')
			}
			else{
				$scope.user = {}
				$scope.error = ['User does not exist in the database']
				console.log($scope.error)
				$location.path('/home')
			}
		})
	}
})

myApp.controller('NewPoll', function($scope, $cookies, $location, NewPollFactory){
	username = []
	$scope.addPoll = function(){
		if($scope.question.name === 'undefined'){
			console.log('Question cannot be blank')
			$location.path('/NewPoll')
		}
		else if($scope.question.optionOne == 'undefined' || $scope.question.optionTwo == 'undefined' || $scope.question.optionThree  == 'undefined' || $scope.question.optionFour  == 'undefined'){
			console.log('Options cannot be blank')
			$location.path('/NewPoll')
		}
		else if($scope.question.optionOne.length < 3 || $scope.question.optionTwo.length < 3 || $scope.question.optionThree.length < 3 || $scope.question.optionFour.length < 3)
		{
			console.log('Option length must be greater than 3 characters')
			$location.path('/NewPoll')
		}
		else if($scope.question.name.length < 8){
			console.log('Question length must be greater than 8 characters')
			$location.path('/NewPoll')
		}
		else{
			console.log($cookies.get('username'))
			username = $cookies.get('username')
			console.log($scope.question)
			console.log(username)
			NewPollFactory.addPoll($scope.question, username, function(data){
				console.log('addPoll NewPoll')
			});
		}
	}
})

myApp.controller('dashboardCont', function($scope, $cookies, $location, DashboardFactory){
	username = []
	DashboardFactory.getPolls(function(data){
		username = $cookies.get('username')
		$scope.username = username
		$scope.polls = data
		console.log($scope.polls)
	})
	$scope.getPolls = function(){
		DashboardFactory.getPolls(function(data){
			username = $cookies.get('username')
			$scope.username = username
			$scope.polls = data
			console.log($scope.polls)
		})
	}
	$scope.deletePoll = function(poll){
		console.log(poll)
		DashboardFactory.deletePoll(poll, function(data){
			console.log('deleted poll')
			DashboardFactory.getPolls(function(data){
				$scope.polls = data
				console.log($scope.polls)
			})
		})
	}
})

myApp.controller('Profile', function($scope, $routeParams, ProfileFactory){
	console.log($routeParams)

	ProfileFactory.getPollProfile($routeParams.id, function(data){
		$scope.question = data[0].question
		$scope.options = data[0].options
	})

	$scope.voteOption = function(o){

		ProfileFactory.voteOption(o, function(data){
			console.log(data)

			ProfileFactory.getPollProfile($routeParams.id, function(data){
				$scope.question = data[0].question
				$scope.options = data[0].options
			})
		})
	}

})