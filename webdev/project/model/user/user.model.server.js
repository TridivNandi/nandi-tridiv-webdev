/**
 * Created by Tridiv on 04-04-2017.
 */
module.exports = function (mongoose) {

    var userSchema = require('./user.schema.server')(mongoose);
    var userModel = mongoose.model('RateMyMovieUser', userSchema);

    var q = require('q');

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUserByFacebookId: findUserByFacebookId,
        findUserByGoogleId: findUserByGoogleId,
        likeMovie: likeMovie,
        unlikeMovie: unlikeMovie,
        isLiked: isLiked,
        addFollower: addFollower,
        addFollowing: addFollowing,
        removeFollowing: removeFollowing,
        removeFollower: removeFollower,
        isFollowing: isFollowing,
        findAllFollowingUsers: findAllFollowingUsers,
        findAllFollowers: findAllFollowers,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    // function createUser(user) {
    //     return userModel.create(user);
    // }

    function createUser(user) {

        var deferred = q.defer();
        userModel.create(user, function(err, user){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    // function findAllUsers() {
    //     return userModel.find();
    // }

    function findAllUsers() {

        var deferred = q.defer();
        userModel.find(function(err, users){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    // function findUserById(userId) {
    //     return userModel.findById(userId);
    // }

    function findUserById(userId) {

        var deferred = q.defer();
        userModel.findById(userId, function(err, user){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    // function findUserByUsername(username) {
    //     return userModel.findOne({username: username});
    // }

    function findUserByUsername(username) {

        var deferred = q.defer();
        userModel.findOne({username: username}, function(err, user) {
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    // function findUserByCredentials(username, password) {
    //     return userModel.findOne({username: username, password: password});
    // }

    function findUserByCredentials(username, password) {

        var deferred = q.defer();
        userModel.findOne({username: username, password: password}, function(err, user){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    // function findUserByFacebookId(facebookId) {
    //     return userModel.findOne({'facebook.id': facebookId});
    // }

    function findUserByFacebookId(facebookId) {

        var deferred = q.defer();
        userModel.findOne({'facebook.id': facebookId}, function(err, user){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findUserByGoogleId(googleId) {

        var deferred = q.defer();
        userModel.findOne({'google.id': googleId}, function(err, user){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    // function likeMovie(userId, mid) {
    //     return userModel.update({_id: userId}, {$addToSet: {movieLikes: mid}});
    // }

    function likeMovie(userId, mid) {

        var deferred = q.defer();
        userModel.update({_id: userId}, {$addToSet: {movieLikes: mid}}, function(err, user){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function unlikeMovie(userId, mid) {

        var deferred = q.defer();
        userModel.update({_id: userId}, {$pullAll: {movieLikes: [mid]}}, function(err, user){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    // function isLiked(userId, mid) {
    //     return userModel.findOne({_id: userId}, {$and: [{movieLikes: {$in: [mid]}}]});
    // }

    function isLiked(userId, mid) {

        var deferred = q.defer();
        userModel.findOne({_id: userId}, {$and: [{movieLikes: {$in: [mid]}}]}, function(err, user){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    // function addFollower(userId, followerId) {
    //     return userModel.update({_id: userId}, {$addToSet: {followers: followerId}});
    // }

    function addFollower(userId, followerId) {

        var deferred = q.defer();
        userModel.update({_id: userId}, {$addToSet: {followers: followerId}}, function(err, user){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    // function addFollowing(userId, followingId) {
    //     return userModel.update({_id: userId}, {$addToSet: {following: followingId}});
    // }

    function addFollowing(userId, followingId) {

        var deferred = q.defer();
        userModel.update({_id: userId}, {$addToSet: {following: followingId}}, function (err, user) {
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    // function removeFollowing(userId, followingId) {
    //     return userModel.update({_id: userId}, {$pullAll: {following: [followingId]}});
    // }

    function removeFollowing(userId, followingId) {

        var deferred = q.defer();
        userModel.update({_id: userId}, {$pullAll: {following: [followingId]}}, function(err, user){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    // function removeFollower(userId, followerId) {
    //     return userModel.update({_id: userId}, {$pullAll: {followers: [followerId]}});
    // }

    function removeFollower(userId, followerId) {

        var deferred = q.defer();
        userModel.update({_id: userId}, {$pullAll: {followers: [followerId]}}, function(err, user){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    // function isFollowing(userId, followId) {
    //     return userModel.findOne({_id: userId, following: {$in: [followId]}});
    // }

    function isFollowing(userId, followId) {

        var deferred = q.defer();
        userModel.findOne({_id: userId, following: {$in: [followId]}}, function(err, user){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    // function findAllFollowingUsers(userIds) {
    //     return userModel.find({_id: {$in: userIds}});
    // }

    function findAllFollowingUsers(userIds) {

        var deferred = q.defer();
        userModel.find({_id: {$in: userIds}}, function(err, users){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    function findAllFollowers(userIds) {

        var deferred = q.defer();
        userModel.find({_id: {$in: userIds}}, function(err, users){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    // function updateUser(userId, user) {
    //     delete user._id;
    //     return userModel.update({_id: userId}, {$set: user});
    // }

    function updateUser(userId, user) {

        var deferred = q.defer();
        delete user._id;
        userModel.update({_id: userId}, {$set: user}, function(err, user){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    // function deleteUser(userId) {
    //     return userModel.remove({_id: userId});
    // }

    function deleteUser(userId) {

        var deferred = q.defer();
        return userModel.remove({_id: userId}, function(err, user){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

};
