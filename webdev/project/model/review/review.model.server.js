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
        //findAllReviewsForId: findAllReviewsForId,
        findAllReviewsForUserId: findAllReviewsForUserId,
        //FindReviewById: findReviewById,
        updateReview: updateReview,
        deleteReview: deleteReview
    };

    return api;

    // function addReview(userId, mid, review) {
    //     review._user = userId;
    //     review.movieId = mid;
    //     return reviewModel.create(review);
    // }

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

    // function findAllReviewsForMovieId(movieId) {
    //     return reviewModel.find({movieId: movieId});
    // }

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

    // function findAllReviewsForId(mid) {
    //     return reviewModel.find({movieId: mid});
    // }

    // function findAllReviewsForId(mid) {
    //
    //     var deferred = q.defer();
    //     reviewModel.find({movieId: mid}, function(err, reviews){
    //         if(err){
    //             deferred.reject(err);
    //         }
    //         else{
    //             deferred.resolve(reviews);
    //         }
    //     });
    //
    //     return deferred.promise;
    // }

    // function findReviewById(reviewId) {
    //     return reviewModel.findById(reviewId);
    // }

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



    // function updateReview(reviewId, review) {
    //
    //     var deferred = q.defer();
    //     delete review._id;
    //     review.timestamp = Date.now();
    //     return reviewModel.update({_id: reviewId}, {$set: review});
    // }

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

    // function deleteReview(reviewId) {
    //     return reviewModel.remove({_id: reviewId});
    // }

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