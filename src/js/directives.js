/**
 * @namespace Directives
 */
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