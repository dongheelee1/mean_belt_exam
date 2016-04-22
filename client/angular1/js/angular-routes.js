var myApp = angular.module('myApp', ['ngRoute', 'ngCookies']);
console.log(myApp)

myApp.config(function($routeProvider){
	$routeProvider
	.when('/home', {
		templateUrl: '/angular1/partials/home.html'
	})
	.when('/Dashboard', {
		templateUrl: '/angular1/partials/dashboard.html'
	})
	.when('/NewPoll', {
		templateUrl: '/angular1/partials/newpoll.html'
	})
	.when('/pollProfile/:id', {
		templateUrl: '/angular1/partials/pollprofile.html'
	})
	.otherwise({
		redirectTo: '/home'
	})
});