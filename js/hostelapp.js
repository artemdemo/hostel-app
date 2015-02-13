/**!
 * hostelapp 
 * version: 0.1.0
 * date: 2015-02-14
 * url: https://github.com/artemdemo/hostel-app.git
 */
var hostelApp = angular.module('hostelApp', ['ionic'])

.run(['$ionicPlatform', function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if(window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if(window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
}])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'pages/home.html',
			controller: 'homeCtrl'
		});

	$urlRouterProvider.otherwise('/');
}]);

(function( app ){
	"use strict";
	/**
	 * Home Page Controller
	 *
	 * @class homeCtrl
	 * @param $scope
	 */
	var homeCtrl = function($scope) {};

	app.controller('homeCtrl', ['$scope', homeCtrl]);
})( hostelApp );