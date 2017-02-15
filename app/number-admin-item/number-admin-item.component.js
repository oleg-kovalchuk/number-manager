'use strict';

angular.module('numberAdminItem').component('numberAdminItem', {
	templateUrl: 'number-admin-item/number-admin-item.template.html',
	controller: function numberAdminItemController(Number, City, Tariff, $rootScope, $mdDialog, $filter) {
		var ctrl = this;
		ctrl.editMode = false;
		ctrl.numberCopy = {};

		City.getCities().then(function(cities) {
			ctrl.cities = cities;
		});

		Tariff.getTariffs().then(function(tariffs) {
			ctrl.tariffs = tariffs;
		});

		ctrl.handleMode = function() {
			ctrl.editMode = !ctrl.editMode;

			if (ctrl.editMode) {
				ctrl.numberCopy = Object.assign({}, ctrl.number);
			}
			else {
				ctrl.number = Object.assign({}, ctrl.numberCopy);
			}
		};

		ctrl.saveNumber = function() {
			Number.setNumber(ctrl.number).then(function(number) {
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
			});
		};
		ctrl.unbookNumber = function() {
			ctrl.number.booked = !ctrl.number.booked;
			
			return Number.orderNumber(ctrl.number);
		};

		ctrl.deleteNumber = function(ev) {
			var confirm = $mdDialog.confirm()
				          .title('Would you like to delete this number?')
				          .textContent('Number: ' + $filter('phoneNumber')(ctrl.number.phone))
				          .targetEvent(ev)
				          .cancel('No')
				          .ok('Yes');
			
			$mdDialog.show(confirm).then(function() {
				Number.deleteNumber(ctrl.number).then(function() {
					var num = $rootScope.numbers.indexOf(ctrl.number);
					$rootScope.numbers.splice(num, 1);
				});
			});
		};

		ctrl.onSelect = function() {
			Number.getNumber(ctrl.number.id).then(function(numberInfo) {
				$mdDialog.show({
			      controller: function($scope, $mdDialog) {
			      	$scope.number = numberInfo;
			      	$scope.cansel = function() {
			      		$mdDialog.cancel();
			      	}
			      },
			      templateUrl: 'dialog-detail/dialog-detail.template.html',
			      parent: angular.element(document.body),
			      targetEvent: ctrl.number,
			      clickOutsideToClose: true,
			      fullscreen: false
			    });
		    });
		};
	},
	bindings: {
		number: '='
	}
});