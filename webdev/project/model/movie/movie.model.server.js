/**
 * Created by Tridiv on 04-04-2017.
 */
module.exports = function (mongoose) {
    console.log("PROJECT SERVER Movie.model.server.js");

    var q = require('q');
    var movieSchema = require('./movie.schema.server')(mongoose);
    var movieModel = mongoose.model('RateMyMovieMovie', movieSchema);

    var api = {
        addMovie: addMovie,
        findMovieById: findMovieById,
        findMovieByMovieId: findMovieByMovieId,
        findAllLikedMovies: findAllLikedMovies,
        deleteMovieById: deleteMovieById,
        deleteMovieByMovieId: deleteMovieByMovieId
    };
    return api;

    function addMovie(movie) {

        var deferred = q.defer();
        movie.movieId = movie.id.toString();
        movieModel.create(movie, function(err, movie){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(movie);
            }
        });
        return deferred.promise;
    }

    function findMovieById(id) {

        var deferred = q.defer();
        movieModel.findById(id, function(err, movie){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(movie);
            }
        });
        return deferred.promise;
    }

    function findMovieByMovieId(movieId) {

        var deferred = q.defer();
        movieModel.findOne({movieId: movieId}, function(err, movie){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(movie);
            }
        });
        return deferred.promise;
    }

    function findAllLikedMovies(movieIds) {

        var deferred = q.defer();
        movieModel.find({movieId: {$in: movieIds}}, function(err, movies){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(movies);
            }
        });
        return deferred.promise;
    }

    function deleteMovieById(id) {

        var deferred = q.defer();
        movieModel.remove({_id: id}, function(err, movie){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(movie);
            }
        });
        return deferred.promise;
    }

    function deleteMovieByMovieId(movieId) {

        var deferred = q.defer();
        movieModel.remove({movieId: movieId}, function(err, movie){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(movie);
            }
        });
        return deferred.promise;
    }

};
