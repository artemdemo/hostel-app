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
		})
		.state('order', {
			url: '/order/:roomtype',
			templateUrl: 'pages/order.html'
		});

	// Default routing
	$urlRouterProvider.otherwise('/');
}]);

(function( app ){
	"use strict";
	/**
	 * Home Page Controller
	 *
	 * @class homeCtrl
	 * @memberof Controllers
	 * @param $scope
	 * @param $ionicModal
	 * @param $translate
	 * @param settingsFactory
	 */
	var homeCtrl = function($scope, $ionicModal, $translate, settingsFactory) {

		$translate.use( settingsFactory.loadLanguage() );

		$ionicModal.fromTemplateUrl('pages/languages.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modal = modal;
		});

		$scope.settings = {};
		$scope.settings.language = settingsFactory.loadLanguage();

		$scope.openLanguages = function(){
			$scope.modal.show();
		};

		$scope.setLanguage = function() {
			$translate.use( $scope.settings.language );
			settingsFactory.saveLanguage( $scope.settings.language );
			$scope.modal.hide();	
		};
		
	};

	app.controller('homeCtrl', ['$scope', '$ionicModal', '$translate', 'settingsFactory', homeCtrl]);
})( hostelApp );


(function( app ){
	"use strict";
	/**
	 * Rooms Controller
	 *
	 * @class roomsCtrl
	 * @memberof Controllers
	 * @param $scope
	 * @param $translate
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


(function( app ){
	"use strict";
	/**
	 * Contact Controller
	 *
	 * @class contactCtrl
	 * @memberof Controllers
	 * @param $scope
	 * @param $translate
	 * @param $sce
	 */
	var contactCtrl = function($scope, $translate, $sce) {
		var addrStr;
		var url = 'https://maps.google.com?saddr=Current+Location&daddr=';

		$translate('GOOGLE_ADDR').then(function(locationAddr){
			addrStr = locationAddr.replace(new RegExp(' ', 'g'), '+');
			$scope.googleMapUrl = $sce.trustAsResourceUrl( url + addrStr );
		});
	};

	app.controller('mainCtrl', ['$scope', '$translate', '$sce', contactCtrl]);
})( hostelApp );


(function( app ){
	"use strict";
	/**
	 * Order Controller
	 *
	 * @class orderCtrl
	 * @memberof Controllers
	 * @param $scope
	 */
	var orderCtrl = function($scope) {
		
		$scope.txt = 'AAA';
	};

	app.controller('orderCtrl', ['$scope', orderCtrl]);
})( hostelApp );


(function( app ){
	"use strict";
	/**
	 * Google Map Direcive
	 *
	 * @class googleMap
	 * @memberof Directives
	 */
	var googleMapDirective = function($sce, $window, $translate) {
		var API_KEY = 'AIzaSyBXWIAGNtGdc-afjo6s4o1jG0GikSJzd14';

		var template = [
			'<iframe ',
  			'width="{{ width }}" ',
  			'height="{{ height }}" ',
  			'frameborder="0" style="border:0" ',
  			'src="{{ url }}">',
			'</iframe>'].join('');

		var link = function(scope, element, attr) {
			var addrStr;
			scope.width = $window.innerWidth;
			scope.height = $window.innerHeight - element[0].offsetTop;

			$translate('GOOGLE_ADDR').then(function(locationAddr){
				addrStr = locationAddr.replace(new RegExp(' ', 'g'), '+');
				scope.url = $sce.trustAsResourceUrl( 'https://www.google.com/maps/embed/v1/place?key=' + API_KEY + '&q=' + addrStr );
			});
		};
		return {
			restrict: 'E',
			scope: {},
			replace: false,
			template: template,
			link: link
		};
	};

	app.directive('googleMap', ['$sce', '$window', '$translate', googleMapDirective]);

})( hostelApp );
(function( app ){
	/**
	 * Settings Factory
	 *
	 * @class settingsFactory
	 * @memberof Factories
	 */
	var settingsFactory = function() {
		var settingsFactory = {};

		/**
		 * Save language name to localstorage
		 *
		 * @function saveLanguage
		 * @memberof Factories.settingsFactory
		 * @param newLng
		 */
		settingsFactory.saveLanguage = function( newLng ) {
			localStorage.setItem("lng", newLng);
		};

		/**
		 * Load language name from localstorage
		 *
		 * @function loadLanguage
		 * @memberof Factories.settingsFactory
		 * @return {String} - default "en"
		 */
		settingsFactory.loadLanguage = function() {
			var defaultLng = "en";
			var lng = localStorage.getItem("lng");
			return  !! lng ? lng : defaultLng;
		};

		return settingsFactory;
	};

	app.factory('settingsFactory', [settingsFactory]);

})( hostelApp );