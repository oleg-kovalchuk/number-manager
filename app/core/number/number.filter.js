angular.module('core').filter('phoneNumber', function() {
	return function(number) {
		if (!number) {
			return '';
		}

		var num = number.toString().trim().replace(/^\+/, '');
		var part1, part2, part3;

		if (num.match(/[^0-9]/)) {
			return number;
		}

		switch(num.length) {
			case 1:
				part3 = num;
				break;
			case 2:
			case 3:
			case 4:
				part1 = num;
				break;
			default:
				part3 = num.slice(0, 1);
				part1 = num.slice(1, 4);
				part2 = num.slice(3);
				break;
		};

		if (part2) {
			if (4 < part2.length) {
				part2 = part2.slice(1, 4) + '-' + part2.slice(4, 9);
			}
			else {
				part2 = part2;
			}

			return ('+' + part3 + ' (' + part1 + ') ' + part2).trim();
		}
		else {
			return '+' + part3;
		}
	};
});