/**
 * Created by Tridiv on 15-02-2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController",pageListController);

    function pageListController(PageService, $routeParams){

        var vm = this;

        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;

        vm.websiteId = websiteId;
        vm.userId = userId;

        function init() {
            var pages = PageService.findPageByWebsiteId(websiteId);
            vm.pages = pages;
        }

        init();



    }
})();