/**
 * Created by Tridiv on 04-04-2017.
 */
(function () {

    angular
        .module('MovieAppMaker')
        .controller('SidebarController', SidebarController);

    function SidebarController($stateParams, UserService) {

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

                        isAlreadyFollowing();

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

        function isAlreadyFollowing() {
            vm.alreadyFollowing = (vm.user.following.indexOf(vm.navUserId) > -1);
        }

        function follow() {
            UserService
                .follow(vm.user._id, vm.navUserId)
                .then(function (response) {
                    var status = response.data;
                    vm.alreadyFollowing = true;
                }, function (err) {
                    vm.alreadyFollowing = false;
                });
        }

        function unfollow() {
            UserService
                .unfollow(vm.user._id, vm.navUserId)
                .then(function (response) {
                    var status = response.data;
                    vm.alreadyFollowing = false;
                }, function (err) {
                    vm.alreadyFollowing = true;
                });
        }

    }

})();