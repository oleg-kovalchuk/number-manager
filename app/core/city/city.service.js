'use strict';

angular.module('core.city').factory('City', function(Restangular) {
	return {
		getCities: function() {
			return Restangular.all('cities').getList().then(function(cities) {
				return cities;
			});
		},
		getNumber: function() {
			var id = $stateParams.id || 0;

			return Restangular.one('number', id).get().then(function(number) {
				return number;
			}, function (err) {
				return err;
			});
		},
	};
});