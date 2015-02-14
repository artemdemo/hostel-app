/**
 * @namespace Factories
 */
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