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