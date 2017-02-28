(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebSiteListController);

    function WebSiteListController($routeParams, WebsiteService) {

        var vm = this;
        var userId = $routeParams.uid;

        function init() {
            var promise = WebsiteService.findWebsitesByUser(userId);
            promise.success(function(websites){
                vm.websites = websites;
            });
        }
        init();

        vm.userId = userId;
    }
})();