/**
 * Created by Tridiv on 04-04-2017.
 */
module.exports = function (mongoose) {
    console.log("PROJECT SERVER models.server.js");
    var models = {
        userModel: require('./user/user.model.server')(mongoose),
        movieModel: require('./movie/movie.model.server')(mongoose),
        reviewModel: require('./review/review.model.server')(mongoose)
    };
    return models;

};