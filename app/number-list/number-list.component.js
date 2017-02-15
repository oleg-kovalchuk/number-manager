'use strict';

angular.module('numberList').component('numberList', {
	templateUrl: 'number-list/number-list.template.html',
	controller: function NumberListController(Number, $rootScope, $mdDialog, $filter) {
		var ctrl = this;

		Number.getNumbers().then(function(numbers) {
			ctrl.numbers = numbers;
			$rootScope.numbers = numbers;
		});
	}
});