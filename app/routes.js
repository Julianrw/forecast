//Whitelist (required for API call in forecastController)
weatherApp.config(function($sceDelegateProvider) {
	$sceDelegateProvider.resourceUrlWhitelist([
		'self',
		'http://api.openweathermap.org/**'
		])
});

//Routes
weatherApp.config(function($routeProvider) {

	$routeProvider
	.when('/', {
		templateUrl: 'views/home.htm',
		controller: 'homeController'
	})
	.when('/forecast', {
		templateUrl: 'views/forecast.htm',
		controller: 'forecastController'
	})
	.when('/forecast/:days', {
		templateUrl: 'views/forecast.htm',
		controller: 'forecastController'
	});

});