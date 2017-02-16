/**
 * Created by Tridiv on 15-02-2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController",pageNewController);

    function pageNewController(PageService, $routeParams, $location){


        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pages = PageService.findPageByWebsiteId(websiteId);
        var vm = this;
        vm.websiteId = websiteId;
        vm.userId = userId;
        vm.pages = pages;

        //event handlers
        vm.createPage = createPage;

        function createPage(page){
            if(page){
                PageService.createPage(websiteId,page);
                $location.url("/user/"+userId+"/website/"+websiteId+"/page");
            }
            else{
                vm.error = "Cannot create new page."
            }
        }


    }
})();