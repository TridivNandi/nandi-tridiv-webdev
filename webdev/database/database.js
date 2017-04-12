/**
 * Created by Tridiv on 04-04-2017.
 */
module.exports = function (mongoose) {

    var connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/test';

    // if (process.env.WEB_CONCURRENCY) {
    //     connectionString = process.env.MONGODB_URI;
    // }

    mongoose.connect(connectionString);

    var projectModels = require('../project/model/models.server')(mongoose);

    var api = {

        RateMyMoviesModels: RateMyMoviesModels
    };
    return api;


    function RateMyMoviesModels() {
        return projectModels;
    }

};