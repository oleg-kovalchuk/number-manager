'use strict';

angular.module('numberCreate').component('numberCreate', {
	templateUrl: 'number-create/number-create.template.html',
	controller: function NumberCreateController(Number, City, Tariff, $rootScope, $mdDialog, $filter) {
		var ctrl = this;
		ctrl.editMode = false;

		ctrl.handleMode = function() {
			ctrl.editMode = !ctrl.editMode;

			if (ctrl.editMode) {
				City.getCities().then(function(cities) {
					ctrl.cities = cities;
				});

				Tariff.getTariffs().then(function(tariffs) {
					ctrl.tariffs = tariffs;
				});
			}
		};

		ctrl.saveNumber = function() {
			Number.setNumber(ctrl.number).then(function(number) {
				$rootScope.numbers.push(ctrl.number);
				ctrl.editMode = !ctrl.editMode;
			    $mdDialog.show(
			    	$mdDialog.alert()
						.parent(angular.element(document.querySelector('#popupContainer')))
						.clickOutsideToClose(true)
						.title('Saving Number')
						.textContent('The number ' + $filter('phoneNumber')(ctrl.number.phone) + ' was save!')
						.ok('Okey')
						.targetEvent(ctrl.number)
				);

				delete ctrl.number;
			});
		};
	}
});