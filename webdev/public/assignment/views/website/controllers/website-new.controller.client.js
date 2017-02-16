/**
 * Created by Tridiv on 14-02-2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, WebsiteService, $location) {




        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var websites = WebsiteService.findAllWebsites(userId);
        var vm = this;
        vm.websites = websites;
        vm.userId = userId;
        vm.website_present = WebsiteService.findWebsiteById(websiteId);

        //event handler
        vm.addWebSite = addWebSite;

        function addWebSite(website){
            if(website){
                WebsiteService.createWebsite(userId, website);
                $location.url("/user/"+userId+"/website/");
            }
            else{
                vm.error = "Cannot create new website."
            }

        }

    }
})();