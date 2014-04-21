define([], function(){
    'use strict';
    return {
        interceptors: [
            ['$rootScope', '$q', function ($rootScope, $q) {
                return {
                    responseError: function(rejection){
                        if(rejection.status === 401){
                            $rootScope.$broadcast('auth:adminRequired');
                        }
                        return $q.reject(rejection);
                    }
                };
            }]
        ]
    };
});
