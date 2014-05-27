define(['angular'], function (angular) {
    'use strict';
    function toBoolean(value) {
        if (value && value.length !== 0) {
            var v = ('' + value).toLowerCase();
            value = !(v === 'f' || v === '0' || v === 'false' || v === 'no' || v === 'n' || v === '[]');
        } else {
            value = false;
        }
        return value;
    }
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

                var onHidden, onDeny, onApprove;
                onDeny = onHidden = onApprove = function () {
                };
                if (attr.onHidden) {
                    onHidden = $parse(attr.onHidden);
                }
                if (attr.onApprove) {
                    onApprove = $parse(attr.onApprove);
                }
                if (attr.onDeny) {
                    onDeny = $parse(attr.onDeny);
                }

                function showModal(value) {
                    if (toBoolean(value)) {
                        element
                            .modal('setting', {
                                onDeny: applyFunction(onDeny),
                                onApprove: applyFunction(onApprove),
                                onHidden: applyFunction(onHidden)
                            })
                            .modal('show')
                        ;
                    }
                }

                attr.$observe('mbModal', function () {
                    showModal(attr.mbModal);
                });
            }
        };
    }];
});