/**
 * Created by Tridiv on 15-02-2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController",pageEditController);

    function pageEditController(PageService, $routeParams, $location){


        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;
        var pages = PageService.findPageByWebsiteId(websiteId);
        var presentPage = PageService.findPageById(pageId);
        var vm = this;
        vm.websiteId = websiteId;
        vm.userId = userId;
        vm.pageId = pageId;
        vm.pages = pages;
        vm.presentPage = presentPage;

        //event handlers
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function updatePage(){
            var isUpdated = PageService.updatePage(pageId,presentPage);
            if(isUpdated){
                $location.url("/user/"+userId+"/website/"+websiteId+"/page")
            }
            else{
                vm.error = "Cannot edit page."
            }
        }

        function deletePage(){
            var isDeleted = PageService.deletePage(pageId);
            if(isDeleted){
                $location.url("/user/"+userId+"/website/"+websiteId+"/page");
            }
            else{
                vm.error = "Cannot delete page.";
            }
        }



    }
})();
