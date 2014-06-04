require.config({
    paths: {
        angular: '../lib/angular/angular',
        angularRoute: '../lib/angular-route/angular-route',
        angularMocks: '../lib/angular-mocks/angular-mocks',
        'socket.io': '../lib/socket.io-client/dist/socket.io.min',
        text: '../lib/requirejs-text/text',
        angularSanitize: '../lib/angular-sanitize/angular-sanitize',
        marked: '../lib/marked/lib/marked',
        highlightjs: '../lib/highlightjs/highlight.pack',
        jquery: '../lib/jquery/dist/jquery.min',
        semanticUi: '../lib/semantic-ui/build/packaged/javascript/semantic.min',
        moment: '../lib/moment/min/moment.min',
        'angular-moment': '../lib/angular-moment/angular-moment.min'
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
        'angularSanitize': {
            deps: ['angular'],
            exports: 'angular.sanitize'
        },
        'socket.io': {
            'exports': 'socket.io'
        },
        jquery: {
            'exports': 'jquery'
        },
        'angular-moment': {
            'deps': ['moment', 'angular']
        },
        semanticUi: {
            deps: ['jquery']
        },
        highlightjs: {
           exports: 'hljs'
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
