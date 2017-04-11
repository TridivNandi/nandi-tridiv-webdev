/**
 * Created by Tridiv on 04-04-2017.
 */
module.exports = function (app, models) {
    console.log("PROJECT SERVER Movie.service.server.js");
    var movieModel = models.movieModel;

    app.post('/rmm/movie', addMovie);

    function addMovie(req, res) {
        var movie = req.body;
        movieModel
            .addMovie(movie)
            .then(function (movie) {
                res.json(movie);
            }, function (err) {
                res.sendStatus(200);
            });
    }

};