(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", registerController);

    function registerController($location, UserService){
        var vm = this;
        console.log("Inside controller");
        vm.addUser = addUser;

        console.log(UserService.deleteUser("456"));

        function addUser(user){
            if(user && (user.password == user.password2)){
                UserService.createUser(user);

            }
            else{
                vm.error = "Error in creating new user";
            }
        }
    }
}) ();