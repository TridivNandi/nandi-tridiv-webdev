/**
 * Created by Tridiv on 04-04-2017.
 */
(function () {

    angular
        .module('MovieAppMaker')
        .controller('FollowingController', FollowingController);

    function FollowingController($stateParams, UserService) {

        var vm = this;
        vm.navUserId = $stateParams.userId;

        vm.follow = follow;
        vm.unfollow = unfollow;

        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;
                        return UserService.findAllFollowingUsers(vm.navUserId);
                    }
                })
                .then(function (response) {
                    var users = response.data;
                    if (users) {

                        isAlreadyFollowing(users);

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

        function isAlreadyFollowing(users) {

            users.forEach(function (user, index, array) {
                user.alreadyFollowing = (vm.user.following.indexOf(user._id) > -1);
                user.itsMe = (vm.user._id === user._id);
            });

            vm.users = users;

        }

        function follow(index) {
            var userId = vm.users[index]._id;
            UserService
                .follow(vm.user._id, userId)
                .then(function (response) {
                    var status = response.data;
                    vm.users[index].alreadyFollowing = true;
                }, function (err) {
                    vm.users[index].alreadyFollowing = false;
                });
        }

        function unfollow(index) {
            var userId = vm.users[index]._id;
            UserService
                .unfollow(vm.user._id, userId)
                .then(function (response) {
                    var status = response.data;
                    vm.users[index].alreadyFollowing = false;
                }, function (err) {
                    vm.users[index].alreadyFollowing = true;
                });
        }

    }

})();