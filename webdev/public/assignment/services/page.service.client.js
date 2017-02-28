/**
 * Created by Tridiv on 14-02-2017.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http){
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        var api ={
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        }

        return api;

        function createPage(websiteId, page){

            return http.post("/api/website/" + websiteId + "/page", page);
            /*var newPage = {};
            newPage.name = page.name;
            newPage.websiteId = websiteId;
            newPage.description = page.description;
            if(pages){
                newPage._id = pages[pages.length-1]._id + 1;
            }
            else{
                newPage._id = 1;
            }

            pages.push(newPage);
            return pages;*/
        }

        function findPageByWebsiteId(websiteId){

            return http.get("/api/website/"+websiteId +"/page");
           /* var pageList= [];
            for (var p in pages){
                if(pages[p].websiteId == websiteId){
                    pageList.push(angular.copy(pages[p]));
                }

            }
            return pageList;*/


        }

        function findPageById(pageId) {

            return http.get("/api/page/"+pageId);
            /*for(var p in pages) {
                if(pageId === pages[p]._id) {
                    return angular.copy(pages[p]);
                }
            }
            return null;*/
        }

        function updatePage(pageId, page){

            return http.put("/api/page/"+pageId, page);
            /*for(var p in pages){
                if(pages[p]._id === pageId){
                    pages[p].description = page.description;
                    pages[p].name = page.name;
                    return true;
                }
            }

            return false;*/


        }

        function deletePage(pageId){

            return http.delete("/api/page/" +pageId);
            /*for(var p in pages){
                if(pageId === pages[p]._id){
                    pages.splice(p, 1);
                    return true;
                }
            }
            return false;*/

        }



    }

})()