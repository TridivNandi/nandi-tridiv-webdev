(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController",websiteEditController);

    function websiteEditController(WebsiteService,$routeParams,$location){

        var vm = this;

        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;

        vm.userId = userId;
        vm.websiteId = websiteId;

        function init() {
            WebsiteService
                .findWebsitesByUser(userId)
                .success(function(websites){
                    vm.websites = websites;
                });
            WebsiteService
                .findWebsiteById(websiteId)
                .success(function(presentWebsite){
                    vm.presentWebsite = presentWebsite;
                });
        }
        init();



        //event handlers
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;


        function deleteWebsite(){
            WebsiteService
                .deleteWebsite(websiteId)
                .success(function(isDeleted){
                    if(isDeleted){
                        $location.url("/user/"+userId+"/website");
                    }
                    else{
                        vm.error = "Cannot delete website.";
                    }
                });
        }

        function updateWebsite() {
            console.log("Inside updateWebsite");
            WebsiteService
                .updateWebsite(websiteId,vm.presentWebsite)
                .success(function(isUpdated){
                    //console.log("website edit controller");
                    //console.log(isUpdated != null);
                    if(isUpdated){
                        $location.url("/user/"+userId+"/website");
                    }
                    else{
                        vm.error = "Cannot edit website.";
                    }
                });

        }


    }

})();