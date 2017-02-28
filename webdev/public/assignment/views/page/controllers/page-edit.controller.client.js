/**
 * Created by Tridiv on 15-02-2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController",pageEditController);

    function pageEditController(PageService, $routeParams, $location){

        var vm = this;

        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;

        vm.websiteId = websiteId;
        vm.userId = userId;
        vm.pageId = pageId;

        function init() {
            PageService
                .findPageByWebsiteId(websiteId)
                .success(function(pages){
                    vm.pages = pages;
                });
            PageService
                .findPageById(pageId)
                .success(function(presentPage){
                    vm.presentPage = presentPage;
                });
        }

        init();


        //event handlers
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function updatePage(){
            PageService
                .updatePage(pageId,vm.presentPage)
                .success(function(isUpdated){
                    if(isUpdated){
                        $location.url("/user/"+userId+"/website/"+websiteId+"/page")
                    }
                    else{
                        vm.error = "Cannot edit page."
                    }
                });

        }

        function deletePage(){
            PageService
                .deletePage(pageId)
                .success(function(isDeleted){
                    if(isDeleted){
                        $location.url("/user/"+userId+"/website/"+websiteId+"/page");
                    }
                    else{
                        vm.error = "Cannot delete page.";
                    }
                });
        }
    }
})();
