(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", registerController);

    function registerController($location, UserService){

        var vm = this;
        vm.addUser = addUser;


        function addUser(user){
            if(user){
                var existingUser = UserService.findUserByUserName(user.username);
                if(!existingUser){
                    if(user.password === user.password2){
                        var newUser = UserService.createUser(user);
                        $location.url("/user/" + newUser._id);
                    }
                    else{
                        vm.error = "Passwords do not match.";
                    }
                }
                else{
                    vm.error = "Username already exists.";
                }
            }
            else{
                vm.error = "Oops! Something went wrong."
            }
        }
    }
}) ();