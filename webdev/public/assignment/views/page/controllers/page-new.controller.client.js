/**
 * Created by Tridiv on 15-02-2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", pageNewController);

    function pageNewController(PageService, $routeParams, $location) {

        var vm = this;

        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;

        vm.websiteId = websiteId;
        vm.userId = userId;

        function init() {
            PageService
                .findPageByWebsiteId(websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                });
        }

        init();

        //event handlers
        vm.createPage = createPage;

        function createPage(page) {

            PageService
                .createPage(websiteId, page)
                .success(function (page) {
                    if (page) {
                        $location.url("/user/" + userId + "/website/" + websiteId + "/page");
                    }
                    else {
                        vm.error = "Cannot create new page."
                    }
                });
        }


    }
})();