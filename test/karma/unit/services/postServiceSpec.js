define([
  'angular',
  'angularMocks',
  'app'
  ], function(angular, mocks, app){
    'use strict';
    describe('Service:', function(){
      beforeEach(mocks.module('microBlog.services'));
      describe('postService', function(){
        describe('post', function(){
          var post = {};
          beforeEach(function(){
            post.text = 'text';
          });

          it('should return the same text', mocks.inject(function(postService){
            expect(postService.post(post).text).toEqual('text');
          }));

          it('should change the total amount of posts', mocks.inject(function(postService){
            postService.post(post);
            expect(postService.getAll().length).toBe(1);
          }));

          it('new post should have an added id', mocks.inject(function(postService){
            var newPost = postService.post(post);
            expect(newPost.id).toBe(0);
          }));

          it('returned post should not be the same object as the posted one.', mocks.inject(function(postService){
            var newPost = postService.post(post);
            expect(newPost).not.toBe(post);
          }));
        });
        describe('get', function(){
          var post = {text:'text'};

          beforeEach(mocks.inject(function(postService){
            postService.post(post);
          }));


          it('should return an existing object', mocks.inject(function(postService){
            expect(postService.get(0).text).toEqual(post.text);
          }));

          it('should return undefined in case of negative index', mocks.inject(function(postService){
            expect(postService.get(-1)).toBe(undefined);
          }));

        });
        describe('getAll', function(){
          var post = {text:'text'};

          beforeEach(mocks.inject(function(postService){
            postService.post(post);
          }));

          it('length should be 1 if only one element is in list', mocks.inject(function(postService){
            expect(postService.getAll().length).toBe(1);
          }));

          it('length should be 2 if two items are in the list', mocks.inject(function(postService){
            postService.post(post);
            expect(postService.getAll().length).toBe(2);
          }));
        });
      });
    });
  });
