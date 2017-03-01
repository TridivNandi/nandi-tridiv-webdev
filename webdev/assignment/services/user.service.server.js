/**
 * Created by Tridiv on 27-02-2017.
 */
module.exports = function(app) {
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.post("/api/user", createUser);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

    function findUserById(req, res){
        var userId = req.params.userId;
        var user = users.find(function (u) {
            return u._id == userId;
        });
        console.log(user);
        res.json(user);

    }

    function findUser(req, res){
        var username = req.query.username;
        var password = req.query.password;
        if(username && password){
            findUserByCredentials(req, res);
        }
        else if(username){
            findUserByUsername(req,res);
        }
    }

    function findUserByCredentials(req, res){
        var username = req.query.username;
        var password = req.query.password;
        var user = users.find(function(user){
            return user.password == password && user.username == username;
        });
        res.json(user);


    }

    function findUserByUsername(req, res){
        var user = users.find(function (u) {
            return u.username == req.query.username;
        });
        if(user){
            res.json(user);
        }
        else{
            res.sendStatus(404);
        }
    }

    function updateUser(req, res){
        var userId = req.params.userId;
        var newUser = req.body;
        for(var u in users){
            if(users[u]._id == userId){
                users[u].firstName = newUser.firstName;
                users[u].lastName = newUser.lastName;
                res.json(users[u]);
                return;
            }
        }
    }

    function createUser(req, res){
        var newUser = req.body;
        if(users){
            newUser._id = users[users.length-1]._id + 1;
        }
        else{
            newUser._id = 1;
        }
        users.push(newUser);
        res.json(newUser);

    }

    function deleteUser(req, res){
        var userId = req.params.userId;
        for(var u in users){
            if (users[u]._id == userId){
                users.splice(u,1);
                return;
            }
        }
    }


}