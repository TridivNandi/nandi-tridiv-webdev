/**
 * Created by Tridiv on 27-02-2017.
 */
module.exports = function(app){

    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.post("/api/user/:userId/website", createWebsite);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    var websites = [
        { "_id": "123", "name": "Facebook", update: new Date(),    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter", update: new Date(),     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo", update: new Date(),     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", update: new Date(), "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers", update: new Date(),    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess", update: new Date(),       "developerId": "234", "description": "Lorem" }
    ];

    function findWebsiteById(req,res){

        var wId = req.params.websiteId;
        var website = websites.find(function (w) {
            return w._id == wId;
        });
        res.json(website);
    }

    function findAllWebsitesForUser(req, res){

        var userId = req.params.userId;

        var websiteList = [];
        for(var w in websites){
            if (websites[w].developerId == userId){
                websiteList.push(websites[w]);
            }
        }
        res.json(websiteList);
    }

    function createWebsite(req, res){

        var newWebsite = req.body;
        var userId = req.params.userId;
        newWebsite.developerId = userId;
        if(websites){
            newWebsite._id = websites[websites.length-1]._id + 1;
        }
        else{
            newWebsite._id = 1;
        }
        websites.push(newWebsite);
        res.json(newWebsite);


    }

    function updateWebsite(req, res){
        var wId = req.params.websiteId;
        var website = req.body;
        for(var w in websites){
            if(websites[w]._id == wId){
                websites[w].name = website.name;
                websites[w].description = website.description;
                res.json(websites[w]);
                return;
            }
        }
    }


    function deleteWebsite(req, res){

        var wId = req.params.websiteId;
        for(var w in websites) {
            if( websites[w]._id == wId ) {
                websites.splice(w, 1);
                res.json(w);
                return;
            }
        }
    }

}