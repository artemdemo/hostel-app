/**
 * @namespace Controllers
 */

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

