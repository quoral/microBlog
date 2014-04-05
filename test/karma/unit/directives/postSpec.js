define([
  'angular',
  'angularMocks',
  'app'
  ], function(angular, mocks, app){
    'use strict';
    describe('Directive:', function(){
      beforeEach(mocks.module('microBlog.directives'));
      describe('post', function(){
        it('should have a text of "wat"', function(){
          mocks.inject(function($compile, $rootScope){
            var element = $compile('<span post></span>')($rootScope);
            expect(element.text()).toEqual('wat');
          });
        });
      });
    });
  });
