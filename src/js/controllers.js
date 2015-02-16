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

		$scope.showValidation = false;

		$scope.placeOrder = function( orderform ) {
			$scope.showValidation = true;
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

