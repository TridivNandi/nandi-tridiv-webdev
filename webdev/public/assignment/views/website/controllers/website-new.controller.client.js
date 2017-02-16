/**
 * Created by Tridiv on 14-02-2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, WebsiteService, $location) {

        var vm = this;

        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;

        vm.userId = userId;
        vm.websiteId = websiteId;

        function init() {
            var websites = WebsiteService.findAllWebsites(userId);
            vm.website_present = WebsiteService.findWebsiteById(websiteId);
            vm.websites = websites;
        }
        init();


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