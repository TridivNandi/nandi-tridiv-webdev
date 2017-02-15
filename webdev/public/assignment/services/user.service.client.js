(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);

    function userService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];
        var api = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUserName": findUserByUserName,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
        return api;

        function createUser(user){
            var newUser = {};
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
            return newUser;
        }

        function findUserById(userId) {
            for(var u in users) {
                if( users[u]._id == userId ) {
                    return users[u];
                }
            }
            return null;
        }

        function findUserByUserName(username){
            for(var u in users){
                if(users[u].username == username){
                    return users[u];
                }
            }
            return null;

        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                if( users[u].username == username &&
                    users[u].password == password ) {
                    return users[u];
                }
            }
            return null;
        }

        function updateUser(userId, newUser) {
            for(var u in users) {
                if( users[u]._id == userId ) {
                    users[u].firstName = newUser.firstName;
                    users[u].lastName = newUser.lastName;
                    console.log(users[u]);
                    return users[u];
                }
            }
            return null;
        }

        function deleteUser(userId){
            for(var u in users){
                if(users[u]._id == userId){
                    var index = users.indexOf(users[u]);
                    users.splice(index, 1);
                    break;
                }
            }
        }




    }
})();