/**
 * Created by Tridiv on 04-04-2017.
 */
module.exports = function (app, database, security) {

    require("./proxy/proxy.movie.service.server")(app);

    var models = database.RateMyMoviesModels();
    require('./services/user.service.server')(app, models, security);
    require('./services/movie.service.server')(app, models);
    require('./services/review.service.server')(app, models);
};