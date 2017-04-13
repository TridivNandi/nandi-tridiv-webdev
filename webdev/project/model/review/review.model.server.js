/**
 * Created by Tridiv on 04-04-2017.
 */
module.exports = function (mongoose) {


    var q = require('q');
    var reviewSchema = require('./review.schema.server')(mongoose);
    var reviewModel = mongoose.model('RateMyMovieReview', reviewSchema);

    var api = {
        addReview: addReview,
        findAllReviewsForMovieId: findAllReviewsForMovieId,
        findAllReviewsForUserId: findAllReviewsForUserId,
        updateReview: updateReview,
        deleteReview: deleteReview
    };

    return api;


    function addReview(userId, mid, review) {

        var deferred = q.defer();
        review._user = userId;
        review.movieId = mid;
        reviewModel.create(review, function (err, review){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(review);
            }
        });
        return deferred.promise;
    }


    function findAllReviewsForMovieId(movieId) {

        var deferred = q.defer();
        reviewModel.find({movieId: movieId}, function (err, reviews){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(reviews);
            }
        });
        return deferred.promise;
    }


    function findAllReviewsForUserId(userId) {

        var deferred = q.defer();
        reviewModel.find({_user: userId}, function(err, reviews){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(reviews);
            }
        });
        return deferred.promise;
    }

    function updateReview(reviewId, review) {

        var deferred = q.defer();
        delete review._id;
        review.timestamp = Date.now();
        reviewModel.update({_id: reviewId}, {$set: review}, function(err, review){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(review);
            }
        });
        return deferred.promise;
    }

    function deleteReview(reviewId) {

        var deferred = q.defer();
        reviewModel.remove({_id: reviewId}, function(err, review){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(review);
            }
        });
        return deferred.promise;
    }

};