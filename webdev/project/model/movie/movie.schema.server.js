/**
 * Created by Tridiv on 04-04-2017.
 */
module.exports = function (mongoose) {

    var movieSchema = mongoose.Schema({
        movieId: {type: String, unique: true},
        title: String,
        imageUrl: String
        }, {collection: 'rate_my_movies.movie'});
    return movieSchema;

};