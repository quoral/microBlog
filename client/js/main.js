require.config({
    paths: {
	angular: '../lib/angular/angular',
	angularRoute: '../lib/angular-route/angular-route',
	angularMocks: '../lib/angular-mocks/angular-mocks',
	text: '../lib/requirejs-text/text',
        angularMarkdownDirective: '../lib/angular-markdown-directive/markdown',
        angularSanitize: '../lib/angular-sanitize/angular-sanitize',
        showdown: '../lib/showdown/compressed/showdown'
    },
    shim: {
	'angular' : {'exports' : 'angular'},
	'angularRoute': ['angular'],
	'angularMocks': {
            deps:['angular'],
            'exports':'angular.mock'
	},
        'angularMarkdownDirective': {
            deps: ['angularSanitize', 'showdown']
        },
        'angularSanitize':{
            deps: ['angular'],

            exports: 'angular.sanitize'
        },
        'showdown':{
            'exports': 'showdown'
        },
        
    },
    priority: [
	'angular'
    ]
});

window.name = 'NG_DEFER_BOOTSTRAP!';

require([
    'angular',
    'app',
    'routes'
], function(angular, app, routes){
    'use strict';
    var $html = angular.element(document.getElementsByTagName('html')[0]);

    angular.element().ready(function() {
	angular.resumeBootstrap([app.name]);
    });
});
