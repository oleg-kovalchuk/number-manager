'use strict';

angular.module('numberManager').config(function($stateProvider, $urlRouterProvider) {
	var welcomeState = {
		name: 'welcome',
		url: '/',
		component: 'numberList'
	};

	var adminState = {
		name: 'admin',
		url: '/admin',
		component: 'numberAdmin'
	};

	$stateProvider.state(welcomeState);
	$stateProvider.state(adminState);
	$urlRouterProvider.otherwise('/');
});