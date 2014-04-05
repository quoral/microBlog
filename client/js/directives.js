define(['angular'], function(angular) {
	'use strict';

  /* Directives */

	angular.module('microBlog.directives', [])
		.directive('post', function() {
			return function(scope, elm, attrs) {
				elm.text('Wat');
		};
	});
});
