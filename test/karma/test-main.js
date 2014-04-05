var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;
var LIB_REGEXP = /(client\/lib)/i;

var pathToModule = function(path) {
  'use strict';
  return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function(file) {
  'use strict';
  //LIB_REGEXP is needed for paths to client/lib that does not contain tests.
  if (TEST_REGEXP.test(file) && !LIB_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    allTestFiles.push(file);
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base/client/js',

	paths: {
		angular: '/base/client/lib/angular/angular',
		angularRoute: '/base/client/lib/angular-route/angular-route',
		angularMocks: '/base/client/lib/angular-mocks/angular-mocks',
	},
  shim: {
		'angular' : {'exports' : 'angular'},
		'angularRoute': ['angular'],
		'angularMocks': {
			deps:['angular'],
			'exports':'angular.mock'
		}
	},

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});
