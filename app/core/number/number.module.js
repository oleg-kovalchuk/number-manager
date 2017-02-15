angular.module('core.number', ['restangular']).config(function(RestangularProvider) {
	RestangularProvider.setBaseUrl('http://localhost:3000');
});