require.config({
    paths: {
        angular: '../lib/angular/angular',
        angularRoute: '../lib/angular-route/angular-route',
        angularMocks: '../lib/angular-mocks/angular-mocks',
        'socket.io': '../lib/socket.io-client/dist/socket.io.min',
        text: '../lib/requirejs-text/text',
        angularMarkdownDirective: '../lib/angular-markdown-directive/markdown',
        angularSanitize: '../lib/angular-sanitize/angular-sanitize',
        showdown: '../lib/showdown/compressed/showdown',
        jquery: '../lib/jquery/dist/jquery.min',
        semanticUi: '../lib/semantic-ui/build/packaged/javascript/semantic.min'
    },
    shim: {
        'angular': {
            deps: ['jquery', 'semanticUi'],
            'exports': 'angular'
        },
        'angularRoute': ['angular'],
        'angularMocks': {
            deps: ['angular'],
            'exports': 'angular.mock'
        },
        'angularMarkdownDirective': {
            deps: ['angularSanitize', 'showdown']
        },
        'angularSanitize': {
            deps: ['angular'],

            exports: 'angular.sanitize'
        },
        'showdown': {
            'exports': 'showdown'
        },
        'socket.io': {
            'exports': 'socket.io'
        },
        jquery: {
            'exports': 'jquery',
        },
        semanticUi: {
            'exports': 'semanticUi',
            deps: ['jquery']
        }
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
], function (angular, app, routes) {
    'use strict';
    var $html = angular.element(document.getElementsByTagName('html')[0]);

    angular.element().ready(function () {
        angular.resumeBootstrap([app.name]);
    });
});
