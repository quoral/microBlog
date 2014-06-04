define(['angular', 'marked', 'highlightjs'], function(angular, marked, highlightjs) {
    'use strict';

    marked.setOptions({
        highlight: function (code) {
            return highlightjs.highlightAuto(code).value;
        }
    });
    return  ['$sanitize', function ($sanitize) {
        return function (scope, element, attrs) {
            if (attrs.mbMarkdown) {
                scope.$watch(attrs.mbMarkdown, function (newVal) {
                    var html = newVal ? $sanitize(marked(newVal)) : '';
                    element.html(html);
                });
            } else {
                var html = $sanitize(marked(element.text()));
                element.html(html);
            }
        };
    }];
});