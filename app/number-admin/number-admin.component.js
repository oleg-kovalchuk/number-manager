'use strict';

angular.module('numberAdmin').component('numberAdmin', {
	templateUrl: 'number-admin/number-admin.template.html',
	controller: function NumberAdminController(Number, $rootScope) {
		var ctrl = this;
		
		Number.getNumbers().then(function(numbers) {
			ctrl.numbers = numbers;
			$rootScope.numbers = numbers;
		});
	}
});