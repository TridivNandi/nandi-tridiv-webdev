(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);

    function userService($http) {

        var api = {
            "createUser": createUser,
            "findUserById": findUserById,
            //"findUserByUserName": findUserByUserName,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
        return api;

        function createUser(user){

            return $http.post("/api/user", user);
            /*var newUser = {};
            newUser.username = user.username;
            newUser.password = user.password;
            newUser.firstName = user.firstName;
            newUser.lastName = user.lastName;
            if(users){
                newUser._id = Number(users[users.length-1]._id) + 1;
            }
            else{
                newUser._id = 1;
            }
            users.push(newUser);
            return newUser;*/
        }

        function findUserById(userId) {

            console.log()
            return $http.get("/api/user/"+userId);
            /*for(var u in users) {
                if( users[u]._id == userId ) {
                    return users[u];
                }
            }
            return null;*/
        }

        function findUserByCredentials(username, password) {

            return $http.get("/api/user?username=" + username + "&password=" + password);
            /*for(var u in users) {
                if( users[u].username == username &&
                    users[u].password == password ) {
                    return users[u];
                }
            }
            return null;*/
        }

        function updateUser(userId, newUser) {

            return $http.put("/api/user/" +userId, newUser );
            /*for(var u in users) {
                if( users[u]._id == userId ) {
                    users[u].firstName = newUser.firstName;
                    users[u].lastName = newUser.lastName;

                    return users[u];
                }
            }
            return null;*/
        }

        function deleteUser(userId){

            return $http.delete("/api/user/" + userId);
            /*for(var u in users){
                if(users[u]._id == userId){
                    var index = users.indexOf(users[u]);
                    users.splice(index, 1);
                    break;
                }
            }*/
        }




    }
})();