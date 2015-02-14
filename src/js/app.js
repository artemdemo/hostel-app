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
		})
		.state('order', {
			url: '/order/:roomname',
			templateUrl: 'pages/order.html'
		});

	// Default routing
	$urlRouterProvider.otherwise('/');
}]);
