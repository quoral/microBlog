define([], function () {
    'use strict';
    return ['$parse', function ($parse) {
        return {
            link: function (scope, element, attr) {
                function applyFunction(fn) {
                    return function () {
                        scope.$apply(function () {
                            fn(scope);
                        });
                    };
                }
                var onHide = function(){};
                if (attr.onHide) {
                    onHide = $parse(attr.onHide);
                }


                function showDimmer(value) {
                    if (value) {
                        element
                            .dimmer('config',{
                                closable: true
                            })
                            .dimmer('show')
                        ;
                    }
                }
                element.on('click', applyFunction(onHide));
                attr.$observe('mbDimmer', function (value) {
                    showDimmer(value === 'true');
                });
            }
        };
    }];
});