/**!
 * hostelapp 
 * version: 0.1.0
 * date: 2015-02-16
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
			url: '/order/:roomname',
			templateUrl: 'pages/order.html'
		});

	// Default routing
	$urlRouterProvider.otherwise('/');
}]);

/**
* Date format prototype
* @param e - format string
* @returns {string}
* @usage
*      var today = new Date();
*      self.startDateTime = today.format('M j, Y, g:ia');  // Sep 16, 2014, 12:12pm
*      today.format('Y-m-d H:i:s'); // SQL date format
*/
/* jshint ignore:start */
Date.prototype.format=function(e){var t="";var n=Date.replaceChars;for(var r=0;r<e.length;r++){var i=e.charAt(r);if(r-1>=0&&e.charAt(r-1)=="\\"){t+=i}else if(n[i]){t+=n[i].call(this)}else if(i!="\\"){t+=i}}return t};Date.replaceChars={shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],longMonths:["January","February","March","April","May","June","July","August","September","October","November","December"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],longDays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],d:function(){return(this.getDate()<10?"0":"")+this.getDate()},D:function(){return Date.replaceChars.shortDays[this.getDay()]},j:function(){return this.getDate()},l:function(){return Date.replaceChars.longDays[this.getDay()]},N:function(){return this.getDay()+1},S:function(){return this.getDate()%10==1&&this.getDate()!=11?"st":this.getDate()%10==2&&this.getDate()!=12?"nd":this.getDate()%10==3&&this.getDate()!=13?"rd":"th"},w:function(){return this.getDay()},z:function(){var e=new Date(this.getFullYear(),0,1);return Math.ceil((this-e)/864e5)},W:function(){var e=new Date(this.getFullYear(),0,1);return Math.ceil(((this-e)/864e5+e.getDay()+1)/7)},F:function(){return Date.replaceChars.longMonths[this.getMonth()]},m:function(){return(this.getMonth()<9?"0":"")+(this.getMonth()+1)},M:function(){return Date.replaceChars.shortMonths[this.getMonth()]},n:function(){return this.getMonth()+1},t:function(){var e=new Date;return(new Date(e.getFullYear(),e.getMonth(),0)).getDate()},L:function(){var e=this.getFullYear();return e%400==0||e%100!=0&&e%4==0},o:function(){var e=new Date(this.valueOf());e.setDate(e.getDate()-(this.getDay()+6)%7+3);return e.getFullYear()},Y:function(){return this.getFullYear()},y:function(){return(""+this.getFullYear()).substr(2)},a:function(){return this.getHours()<12?"am":"pm"},A:function(){return this.getHours()<12?"AM":"PM"},B:function(){return Math.floor(((this.getUTCHours()+1)%24+this.getUTCMinutes()/60+this.getUTCSeconds()/3600)*1e3/24)},g:function(){return this.getHours()%12||12},G:function(){return this.getHours()},h:function(){return((this.getHours()%12||12)<10?"0":"")+(this.getHours()%12||12)},H:function(){return(this.getHours()<10?"0":"")+this.getHours()},i:function(){return(this.getMinutes()<10?"0":"")+this.getMinutes()},s:function(){return(this.getSeconds()<10?"0":"")+this.getSeconds()},u:function(){var e=this.getMilliseconds();return(e<10?"00":e<100?"0":"")+e},e:function(){return"Not Yet Supported"},I:function(){var e=null;for(var t=0;t<12;++t){var n=new Date(this.getFullYear(),t,1);var r=n.getTimezoneOffset();if(e===null)e=r;else if(r<e){e=r;break}else if(r>e)break}return this.getTimezoneOffset()==e|0},O:function(){return(-this.getTimezoneOffset()<0?"-":"+")+(Math.abs(this.getTimezoneOffset()/60)<10?"0":"")+Math.abs(this.getTimezoneOffset()/60)+"00"},P:function(){return(-this.getTimezoneOffset()<0?"-":"+")+(Math.abs(this.getTimezoneOffset()/60)<10?"0":"")+Math.abs(this.getTimezoneOffset()/60)+":00"},T:function(){var e=this.getMonth();this.setMonth(0);var t=this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/,"$1");this.setMonth(e);return t},Z:function(){return-this.getTimezoneOffset()*60},c:function(){return this.format("Y-m-d\\TH:i:sP")},r:function(){return this.toString()},U:function(){return this.getTime()/1e3}};
/* jshint ignore:end */
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
	 * @param $stateParams
	 * @param $translate
	 */
	var orderCtrl = function($scope, $q, $stateParams, $state, $translate, $ionicPopup) {

		var today, tomorrow;

		$translate( $stateParams.roomname ).then(function( roomname ){
			$scope.roomName = roomname;
		});

		today = new Date();
		tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

		// objet with order data
		$scope.order = {
			fname: '',
			lname: '',
			nguests: 1,
			datein: today,
			dateout: tomorrow,
			phone: '',
			email: '',
			comments: ''
		};

		$scope.minDateIn = today.format('Y-m-d');
		$scope.minDateOut = tomorrow.format('Y-m-d');

		$scope.placeOrder = function( orderform ) {
			if ( orderform.$valid ) {
				$q.all([
					$translate('THANK_YOU'),
					$translate('U_ORDER_IN_WORK')
				]).then(function( values ){
					$ionicPopup.show({
						title: values[0],
						template: values[1],
						scope: $scope,
						buttons: [
							{
								text: 'Ok',
								type: 'button-positive',
								onTap: function(e) {
									$state.go('home');
								}
							}
						]
					});
				});
			} else {
				$q.all([
					$translate('NOTICE'),
					$translate('FORM_GENERAL_ERROR')
				]).then(function( values ){
					$ionicPopup.show({
						title: values[0],
						template: values[1],
						scope: $scope,
						buttons: [
							{
								text: 'Ok',
								type: 'button-assertive'
							}
						]
					});
				});
			}
		};
	};

	app.controller('orderCtrl', ['$scope', '$q', '$stateParams', '$state', '$translate', '$ionicPopup', orderCtrl]);
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