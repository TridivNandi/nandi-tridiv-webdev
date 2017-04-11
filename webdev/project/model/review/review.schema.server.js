/**
 * Created by Tridiv on 04-04-2017.
 */
module.exports = function (mongoose) {
    console.log("PROJECT SERVER Review.schema.server.js");
    var reviewSchema = mongoose.Schema({
        title: String,
        description: String,
        timestamp: {type: Date, default: Date.now()},
        movieId: String,
        _movie: {type: mongoose.Schema.Types.ObjectId, ref: 'RateMyMovieMovie'},
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'RateMyMovieUser'},
        rating: String
    }, {collection: 'rate_my_movies.review'});
    return reviewSchema;

};