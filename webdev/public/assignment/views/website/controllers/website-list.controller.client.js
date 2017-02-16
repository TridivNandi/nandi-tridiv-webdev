(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebSiteListController);

    function WebSiteListController($routeParams, WebsiteService) {

        var vm = this;
        var userId = $routeParams.uid;

        function init() {
            var websites = WebsiteService.findAllWebsites(userId);
            vm.websites = websites;

        }
        init();

        vm.userId = userId;
    }
})();