(function () {
    angular
        .module("WebAppMaker")
        .service("WebsiteService", WebsiteService);

    function WebsiteService($http) {

        var api ={
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite,
            //"findAllWebsites": findAllWebsites
        }

        return api;

        function createWebsite(userID, website){

            return $http.post("/api/user/"+userID+"/website",website);
            /*var newWebsite = {};
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

            websites.push(newWebsite);*/

        }

        function findWebsitesByUser(userId){

            return  $http.get("/api/user/"+userId+"/website");
           /* var websiteList= [];
            for (var w in websites){
                if(websites[w].developerId == userId){
                    websiteList.push(angular.copy(websites[w]));
                }

            }
            return websiteList;*/


        }

        function findWebsiteById(websiteId) {

            return $http.get("/api/website/"+websiteId);
            /*for(var w in websites) {
                if(websiteId === websites[w]._id) {
                    return angular.copy(websites[w]);
                }
            }
            return null;*/
        }

        function updateWebsite(websiteId, website){

            return $http.put("/api/website/"+websiteId,website);
            /*for(var w in websites){
                if(websites[w]._id === websiteId){
                    websites[w].description = website.description;
                    websites[w].name = website.name;
                    return true;
                }
            }

            return false;*/


        }

        function deleteWebsite(websiteId){

            return $http.delete("/api/website/"+websiteId);
            /*for(var w in websites){
                if(websiteId === websites[w]._id){
                    websites.splice(w, 1);
                    return true;
                }
            }
            console.log(websites[0]);
            return false;*/

        }

        /*function findAllWebsites(userId) {
            var sites = [];
            for(var w in websites) {
                if(userId === websites[w].developerId) {
                    sites.push(websites[w]);
                }
            }
            return sites;
        }*/
    }
})();