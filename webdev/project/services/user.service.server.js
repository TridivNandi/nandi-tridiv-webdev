/**
 * Created by Tridiv on 04-04-2017.
 */
module.exports = function (app, models, security) {

    var movieModel = models.movieModel;
    var userModel = models.userModel;

    var bcrypt = security.getBCrypt();
    var multer = require('multer');
    var passport = security.getPassport();

    var auth = authorized;
    var upload = multer({dest: __dirname + '/../../public/uploads'});

    // Login and logout requests
    app.post('/rmm/login', passport.authenticate('rmm'), login);
    app.post('/rmm/logout', logout);
    app.post('/rmm/register', register);
    app.get('/rmm/loggedin', loggedIn);
    app.get('/auth/google', passport.authenticate('google', {scope: ['profile','email']}));
    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/project/#/profile/null/edit-profile',
            failureRedirect: '/project/#/login'
        }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/#/profile/null/edit-profile',
            failureRedirect: '/project/#/login'
        }));


    // CRUD requests
    app.get('/rmm/user/:uid', findUserById);
    app.put('/rmm/user/:uid/movie/:mid/like', likeMovie);
    app.put('/rmm/user/:uid/movie/:mid/unlike', unlikeMovie);
    app.get('/rmm/user/:uid/movie/:mid/isLiked', isLiked);
    app.put('/rmm/user/:uid/follow/:followid', followUser);
    app.put('/rmm/user/:uid/unfollow/:unfollowid', unfollowUser);
    app.get('/rmm/user/:uid/isfollowing/:followingid', isFollowing);
    app.get('/rmm/user/:uid/following', findAllFollowingUsers);
    app.get('/rmm/user/:uid/followers', findAllFollowers);
    app.get('/rmm/user/:uid/likes', findAllLikedMovies);
    app.post('/rmm/user/:uid', upload.single('profilePic'), uploadUserImage);
    app.put('/rmm/user/:uid', updateUser);
    app.delete('/rmm/user/:uid', deleteUser);

    // Admin requests
    app.post('/rmm/admin/user', auth, createUserByAdmin);
    app.get('/rmm/admin/users', auth, findAllUsersForAdmin);
    app.put('/rmm/admin/user/:uid', auth, updateUserByAdmin);
    app.delete('/rmm/admin/user/:uid', auth, deleteUserByAdmin);

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.sendStatus(401);
        } else {
            next();
        }
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.sendStatus(200);
    }

    function loggedIn(req, res) {
        res.send(req.isAuthenticated() ? req.user : null);
    }

    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel
            .createUser(user)
            .then(function (user) {
                if (user) {
                    req.login(user, function (err) {
                        if (err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            }, function (err) {
                if (err.code === 11000)
                    res.status(409).send("Duplicate username");
                else
                    res.status(400).send(err);
            });
    }

    function findUserById(req, res) {
        var userId = req.params['uid'];
        userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.status(404).send(err);
            });
    }

    function likeMovie(req, res) {
        var userId = req.params['uid'];
        var mid = req.params['mid'];
        userModel
            .likeMovie(userId, mid)
            .then(function (stats) {
                res.sendStatus(200);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function unlikeMovie(req, res) {
        var userId = req.params['uid'];
        var mid = req.params['mid'];
        userModel
            .unlikeMovie(userId, mid)
            .then(function (stats) {
                res.sendStatus(200);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function isLiked(req, res) {
        var userId = req.params['uid'];
        var mid = req.params['mid'];
        userModel
            .isLiked(userId, mid)
            .then(function (user) {
                if (user) {
                    res.sendStatus(200);
                } else {
                    res.sendStatus(404);
                }
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function followUser(req, res) {
        var userId = req.params['uid'];
        var followId = req.params['followid'];
        userModel
            .addFollowing(userId, followId)
            .then(function (stats) {
                return userModel
                    .addFollower(followId, userId);
            }, function (err) {
                res.status(400).send(err);
            })
            .then(function (stats) {
                res.sendStatus(200);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function unfollowUser(req, res) {
        var userId = req.params['uid'];
        var unfollowId = req.params['unfollowid'];
        userModel
            .removeFollowing(userId, unfollowId)
            .then(function (stats) {
                return userModel
                    .removeFollower(unfollowId, userId);
            }, function (err) {
                res.status(400).send(err);
            })
            .then(function (stats) {
                res.sendStatus(200);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function isFollowing(req, res) {
        var userId = req.params['uid'];
        var followingId = req.params['followingid'];
        userModel
            .isFollowing(userId, followingId)
            .then(function (user) {
                if (user) {
                    res.sendStatus(200);
                } else {
                    res.sendStatus(404);
                }
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function findAllFollowingUsers(req, res) {
        var userId = req.params['uid'];
        userModel
            .findUserById(userId)
            .then(function (user) {
                return userModel
                    .findAllFollowingUsers(user.following);
            }, function (err) {
                res.status(400).send(err);
            })
            .then(function (users) {
                res.json(users);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function findAllFollowers(req, res) {
        var userId = req.params['uid'];
        userModel
            .findUserById(userId)
            .then(function (user) {
                return userModel
                    .findAllFollowers(user.followers);
            }, function (err) {
                res.status(400).send(err);
            })
            .then(function (users) {
                res.json(users);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function findAllLikedMovies(req, res) {
        var userId = req.params['uid'];
        userModel
            .findUserById(userId)
            .then(function (user) {
                return movieModel
                    .findAllLikedMovies(user.movieLikes);
            }, function (err) {
                res.status(400).send(err);
            })
            .then(function (movies) {
                res.json(movies);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function uploadUserImage(req, res) {
        var userId = req.params['uid'];
        var profilePic = req.file;
        var user = req.body;

        if (profilePic) {
            user.imgUrl = '/uploads/' + profilePic.filename;
        }

        userModel
            .updateUser(userId, user)
            .then(function (stats) {
                return userModel
                    .findUserById(userId);
            }, function (err) {
                res.status(400).send(err);
            })
            .then(function (user) {
                req.session.currentUser = user;
                res.redirect('/project/#/profile/' + userId + '/edit-profile');
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function updateUser(req, res) {
        var userId = req.params['uid'];
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel
            .updateUser(userId, user)
            .then(function (stats) {
                return userModel
                    .findUserById(userId);
            }, function (err) {
                res.status(400).send(err);
            })
            .then(function (user) {
                req.session.currentUser = user;
                res.sendStatus(200);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function deleteUser(req, res) {
        var userId = req.params['uid'];
        userModel
            .deleteUser(userId)
            .then(function (stats) {
                res.sendStatus(200);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function isAdmin(user) {
        return (user.role.indexOf("admin") > -1);
    }

    function createUserByAdmin(req, res) {
        var user = req.user;
        if (isAdmin(user)) {
            var newUser = req.body;
            newUser.password = bcrypt.hashSync(newUser.password);
            userModel
                .createUser(newUser)
                .then(function (user) {
                    return userModel
                        .findAllUsers();
                }, function (err) {
                    if (err.code === 11000)
                        res.status(409).send("Duplicate username");
                    else
                        res.status(400).send(err);
                })
                .then(function (users) {
                    res.json(users);
                }, function (err) {
                    res.status(400).send(err);
                });
        } else {
            res.sendStatus(403);
        }

    }

    function findAllUsersForAdmin(req, res) {
        var user = req.user;
        if (isAdmin(user)) {
            userModel
                .findAllUsers()
                .then(function (users) {
                    res.json(users);
                }, function (err) {
                    res.status(400).send(err);
                });
        } else {
            res.sendStatus(403);
        }
    }

    function updateUserByAdmin(req, res) {
        var user = req.user;
        var change = false;
        if (isAdmin(user)) {
            var newUser = req.body;
            userModel
                .findUserById(newUser._id)
                .then(function (gotUser) {
                    change = !(gotUser.password === newUser.password);
                });
            if (change) {
                newUser.password = bcrypt.hashSync(newUser.password);
            }
            var newUserId = req.params['uid'];
            userModel
                .updateUser(newUserId, newUser)
                .then(function (stats) {
                    return userModel
                        .findAllUsers();
                }, function (err) {
                    res.status(400).send(err);
                })
                .then(function (users) {
                    res.json(users);
                }, function (err) {
                    res.status(400).send(err);
                })
        } else {
            res.sendStatus(403);
        }
    }

    function deleteUserByAdmin(req, res) {
        var user = req.user;
        if (isAdmin(user)) {
            var newUserId = req.params['uid'];
            userModel
                .deleteUser(newUserId)
                .then(function (stats) {
                    return userModel
                        .findAllUsers();
                }, function (err) {
                    res.status(400).send(err);
                })
                .then(function (users) {
                    res.json(users);
                }, function (err) {
                    res.status(400).send(err);
                })
        } else {
            res.sendStatus(403);
        }
    }

};