//Controllers

//Home Page Controller
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {
	//sets initial value for $scope.city based on cityService in services.js, then watches the city value on the homepage for changes and echos them back to cityService.
	$scope.city = cityService.city;
	$scope.$watch('city', function() {
		cityService.city = $scope.city;
	});

}]);

//Forecast Page Controller
weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams' ,'cityService', 'degreeService', function($scope, $resource, $routeParams, cityService, degreeService) {

	//values to be passed to 'openweathermap.org's API.
	$scope.city = cityService.city;
	$scope.days = $routeParams.days || '1';
	//call for weather info from 'openweathermap.org's API. OpenWeatherMap has been whitelisted in routes.js for the sake of easy access.
	$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?appid=0f6b75f666544e27da21502649840b0e", {get: {method: "JSONP"}});
	$scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days});

	//sets, and then watchs for, the unit used for tempurature display on the page.
	$scope.degree = degreeService.degree;
	$scope.$watch('degree', function() {
		degreeService.degree = $scope.degree;
	});
	//checks if the app has Fahrenheit set as it's prefered display setting. If not displays Celsius like any sane individual should. Conversions are from units Kelivn.
	$scope.convertToStdUnit = function(degK, unit) {
		if (unit === "Fahrenheit") {
			return Math.round(degK * 1.8 - 459.67) + '\xB0' + 'F';
		} else {
			return Math.round(degK - 273.15) + '\xB0' + 'C';
		}
	};

	//converts date from JSON object into human legible format
	$scope.convertToDate = function(dt) {
		return new Date(dt * 1000);
	};

}]);