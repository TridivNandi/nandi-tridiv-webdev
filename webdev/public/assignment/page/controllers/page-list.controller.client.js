/**
 * Created by Tridiv on 15-02-2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController",pageListController);

    function pageListController(PageService, $routeParams){


        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pages = PageService.findPageByWebsiteId(websiteId);
        var vm = this;
        vm.websiteId = websiteId;
        vm.userId = userId;
        vm.pages = pages;


    }
})();