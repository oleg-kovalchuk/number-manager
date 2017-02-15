'use strict';

angular.module('core.tariff').factory('Tariff', function(Restangular) {
	return {
		getTariffs: function() {
			return Restangular.all('tariffs').getList().then(function(tariffs) {
				return tariffs;
			});
		}
	};
});