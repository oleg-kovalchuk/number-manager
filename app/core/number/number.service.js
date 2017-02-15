'use strict';

angular.module('core.number').factory('Number', function($stateParams, Restangular) {
	return {
		getNumbers: function() {
			return Restangular.all('numbers').getList().then(function(numbers) {
				return numbers;
			}, function (err) {
				return err;
			});
		},
		getNumber: function(id) {
			return Restangular.one('number/' + id).getList().then(function(number) {
				return number[0];
			}, function (err) {
				return err;
			});
		},
		setNumber: function(number) {
			if (0 < number.id)
			{
				return Restangular.one('number/' + number.id).get().then(function(num) {
					num[0] = number;
					num.put();

					return num;
				}, function (err) {
					return err;
				});
			}
			return Restangular.all('numbers').post(number).then(function(data) {
				return data;
			}, function (err) {
				return err;
			});
		},
		orderNumber: function(number) {
			return Restangular.one('number/' + number.id).get().then(function(num) {
				num[0] = number;
				num.put();

				return num;
			}, function (err) {
				return err;
			});
		},
		deleteNumber: function(number) {
			return Restangular.one('number/' + number.id).get().then(function(num) {
				return num.remove();
			}, function (err) {
				return err;
			});
		}
	};
});