(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        var userId = $routeParams['uid'];


        function init() {
            var promise = UserService.findUserById(userId);
            promise.success(function(user){
                vm.user = user;
            });

        }
        init();

        function updateUser(newUser) {
            var promise = UserService.updateUser(userId, newUser);
            promise.success(function (user){
                if(user != null){
                    vm.message = "User successfully updated."
                } else {
                    vm.error = "Unable to update user";
                }
            });
        }
    }
})();