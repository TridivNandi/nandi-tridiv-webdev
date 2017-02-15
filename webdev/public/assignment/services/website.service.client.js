(function () {
    angular
        .module("WebAppMaker")
        .service("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
            { "_id": "123", "name": "Facebook", update: new Date(),    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter", update: new Date(),     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo", update: new Date(),     "developerId": "456", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", update: new Date(), "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers", update: new Date(),    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess", update: new Date(),       "developerId": "234", "description": "Lorem" }
        ];

        var api ={
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite,
            "findAllWebsites": findAllWebsites
        }

        return api;

        function createWebsite(userID, website){
            var newWebsite = {};
            newWebsite.name = website.name;
            newWebsite.update = new Date();
            newWebsite.developerId = userID;
            newWebsite.description = website.description;
            if(websites){
                newWebsite._id = websites[websites.length-1]._id + 1;
            }
            else{
                newWebsite._id = 1;
            }

            websites.push(newWebsite);
            //console.log(websites[6]);
            //return websites;
        }

        function findWebsitesByUser(userId){
            var websiteList= [];
            for (var w in websites){
                if(websites[w].developerId == userId){
                    websiteList.push(angular.copy(websites[w]));
                }

            }
            //console.log(websiteList[0]);
            return websiteList;


        }

        function findWebsiteById(websiteId) {
            for(var w in websites) {
                if(websiteId === websites[w]._id) {
                    return angular.copy(websites[w]);
                }
            }
            return null;
        }

        function updateWebsite(websiteId, website){
            for(var w in websites){
                if(websites[w]._id === websiteId){
                    websites[w].description = website.description;
                    websites[w].name = website.name;
                    return true;
                }
            }

            return false;


        }

        function deleteWebsite(websiteId){
            for(var w in websites){
                if(websiteId === websites[w]._id){
                    websites.splice(w, 1);
                    return true;
                }
            }
            console.log(websites[0]);
            return false;

        }

        // extra code
        function findAllWebsites(userId) {
            var sites = [];
            for(var w in websites) {
                if(userId === websites[w].developerId) {
                    sites.push(websites[w]);
                }
            }
            return sites;
        }
    }
})();