/**!
 * hostelapp 
 * version: 0.1.0
 * date: 2015-02-14
 * url: https://github.com/artemdemo/hostel-app.git
 */
var hostelApp = angular.module('hostelApp', ['ionic', 'pascalprecht.translate', 'ngSanitize'])

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

/**
 * Application configuration
 */
.config([
	'$stateProvider', '$urlRouterProvider', '$translateProvider', '$ionicConfigProvider',
function(
	$stateProvider, $urlRouterProvider, $translateProvider, $ionicConfigProvider ){

	// Setting up loading of translated sentences
	$translateProvider.useStaticFilesLoader({
		prefix: 'translations/',
		suffix: '.json'
	});
	// Setting preferred language
	$translateProvider.preferredLanguage('en');

	// ionic configuration
	$ionicConfigProvider.backButton.text('');
    $ionicConfigProvider.backButton.previousTitleText(false);

	// Setting up routing of the application
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'pages/home.html'
		})
		.state('service', {
			url: '/service',
			templateUrl: 'pages/service.html'
		})
		.state('rooms', {
			url: '/rooms',
			templateUrl: 'pages/rooms.html'
		})
		.state('contact', {
			url: '/contact',
			templateUrl: 'pages/contact.html'
		});

	// Default routing
	$urlRouterProvider.otherwise('/');
}]);

(function( app ){
	"use strict";
	/**
	 * Main Controller
	 *
	 * @class mainCtrl
	 * @param $scope
	 */
	var mainCtrl = function($scope) {};

	app.controller('mainCtrl', ['$scope', mainCtrl]);
})( hostelApp );


(function( app ){
	"use strict";
	/**
	 * Rooms Controller
	 *
	 * @class mainCtrl
	 * @param $scope
	 */
	var roomsCtrl = function($scope, $translate) {
		$translate('STN_ROOM_PRICE').then(function(str){
			$scope.STN_ROOM_PRICE = str;
		});
		$translate('FML_ROOM_PRICE').then(function(str){
			$scope.FML_ROOM_PRICE = str;
		});
		$translate('LXR_ROOM_PRICE').then(function(str){
			$scope.LXR_ROOM_PRICE = str;
		});
		$translate('TWN_ROOM_PRICE').then(function(str){
			$scope.TWN_ROOM_PRICE = str;
		});
		$translate('WND_ROOM_PRICE').then(function(str){
			$scope.WND_ROOM_PRICE = str;
		});
	};

	app.controller('roomsCtrl', ['$scope', '$translate', roomsCtrl]);
})( hostelApp );