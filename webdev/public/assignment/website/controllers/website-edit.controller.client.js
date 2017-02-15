(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController",websiteEditController);

    function websiteEditController(WebsiteService,$routeParams,$location){

        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var websites = WebsiteService.findWebsitesByUser(userId);
        var presentWebsite = WebsiteService.findWebsiteById(websiteId);
        var vm = this;
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.websites = websites;
        vm.presentWebsite = presentWebsite;

        //event handlers
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;


        function deleteWebsite(){
            var isDeleted = WebsiteService.deleteWebsite(websiteId);
            if(isDeleted){
                $location.url("/user/"+userId+"/website");
            }
            else{
                vm.error = "Cannot delete website.";
            }
        }

        function updateWebsite() {
            var isUpdated = WebsiteService.updateWebsite(websiteId,presentWebsite);
            if(isUpdated){
                $location.url("/user/"+userId+"/website");
            }
            else{
                vm.error = "Cannot edit website.";
            }
        }


    }

})();