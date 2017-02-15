'use strict';

angular.module('numberListItem').component('numberListItem', {
	templateUrl: 'number-list-item/number-list-item.template.html',
	controller: function NumberListItemController(Number, $rootScope, $mdDialog, $filter) {
		var ctrl = this;

		ctrl.onSelect = function(ev) {
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
			      targetEvent: ev,
			      clickOutsideToClose: true,
			      fullscreen: false
			    });
		    });
		};

		ctrl.orderNumber = function(ev) {
			ctrl.number.booked = !ctrl.number.booked;

			return Number.orderNumber(ctrl.number).then(function(data) {
				var num = $rootScope.numbers.indexOf(ctrl.number);
			    $mdDialog.show(
			    	$mdDialog.alert()
						.parent(angular.element(document.querySelector('#popupContainer')))
						.clickOutsideToClose(true)
						.title('Ordering Number')
						.textContent('The number ' + $filter('phoneNumber')(ctrl.number.phone) + ' was ordered!')
						.ok('Okey')
						.targetEvent(ev)
				);
				$rootScope.numbers.splice(num, 1);
			});
		};
	},
	bindings: {
		number: '='
	}
});