/**
 * Created by Tridiv on 04-04-2017.
 */
(function () {

    angular
        .module('MovieAppMaker')
        .controller('LikesController', LikesController);

    function LikesController($stateParams, UserService) {

        var vm = this;
        vm.navUserId = $stateParams.userId;

        vm.like = like;
        vm.unlike = unlike;

        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;
                        return UserService.findAllLikedMovies(vm.navUserId);
                    }
                })
                .then(function (response) {
                    var movies = response.data;
                    if (movies) {

                        isMovieLiked(movies);

                        UserService
                            .findUserById(vm.navUserId)
                            .then(function (response) {
                                var user = response.data;
                                if (user) {
                                    vm.navUser = user;
                                }
                            });
                    }
                });
        }

        init();

        function isMovieLiked(movies) {

            movies.forEach(function (movie, index, array) {
                movie.isLiked = (vm.user.movieLikes.indexOf(movie.movieId) > -1);
            });

            vm.movies = movies;

        }

        function like(index) {
            var movieId = vm.movies[index].movieId;
            UserService
                .like(vm.user._id, movieId)
                .then(function (response) {
                    var status = response.data;
                    vm.movies[index].isLiked = true;
                });
        }

        function unlike(index) {
            var movieId = vm.movies[index].movieId;
            UserService
                .unlike(vm.user._id, movieId)
                .then(function (response) {
                    var status = response.data;
                    vm.movies[index].isLiked = false;
                });
        }

    }

})();