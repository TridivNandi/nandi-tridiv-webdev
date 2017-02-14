(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebSiteListController);

    function WebSiteListController($routeParams, WebsiteService) {
        console.log("In here");
        var userId = $routeParams.uid;
        var websites = WebsiteService.findAllWebsites(userId);
        var vm = this;
        vm.websites = websites;
        vm.userId = userId;
    }
})();