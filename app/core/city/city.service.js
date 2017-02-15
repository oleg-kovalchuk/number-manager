'use strict';

angular.module('core.city').factory('City', function(Restangular) {
	return {
		getCities: function() {
			return Restangular.all('cities').getList().then(function(cities) {
				return cities;
			});
		}
	};
});
