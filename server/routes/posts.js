'use strict';

var auth = require('./middlewares/auth');

module.exports = function(app, passport){
    var Post = app.get('models').Post;
    
    app.post('/rest/posts', [auth.requiresLogin, auth.requiresPosting], function(req, res, next){
        var post = Post.build(req.body);
        console.log('Entered posting');
        post.save()
            .error(function(err){
                console.log('Failed /rest/posts post with', err);
                res.status(500).send();
            })
            .success(function(newPost){
                res.send(JSON.stringify(newPost));
            });
    });

    app.get('/rest/posts', function(req, res){
        Post.all()
            .success(function(posts){
                res.send(JSON.stringify(posts));
            })
            .error(function(err){
                console.log('Failed /rest/posts get with', err);
                res.status(500).send();
            });
    });

    app.get('/rest/posts/:id', function(req, res){
        Post.find(req.params.id)
            .success(function(singlePost){
                if(singlePost === null){
                    res.status(404).send();
                    return;
                }
                res.send(JSON.stringify(singlePost));
            })
            .error(function(err){
                console.log('Failed /rest/posts post with', err);
                res.status(500).send();
            });
    });

    app.del('/rest/posts/:id', auth.requiresLogin, function(req, res, next){
        Post.find(req.params.id)
            .success(function(singlePost){
                if(singlePost === null){
                    res.status(404).send();
                    return;
                }
                singlePost.destroy()
                    .success(function(){
                        res.status(200).send();
                    })
                    .error(function(){
                        console.log('Failed to remove', req.params.id);
                        res.status(500).send();
                    });
            })
            .error(function(err){
                console.log('Failed /rest/posts delete with', err);
                res.status(500).send();
            });
    });


};
