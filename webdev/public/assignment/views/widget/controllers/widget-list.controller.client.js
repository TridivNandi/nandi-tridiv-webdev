(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController",widgetListController);

    function widgetListController(WidgetService,$sce,$routeParams){

        var vm = this;


        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;

        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pageId = pageId;

        function init() {
            WidgetService
                .findWidgetsByPageId(pageId)
                .success(function(widgets){
                    vm.widgets= widgets;
                })


        }
        init();


        //event handlers
        vm.doYouTrustUrl = doYouTrustUrl;

        function doYouTrustUrl(url) {
            var baseUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split('/');
            var id = urlParts[urlParts.length - 1];
            baseUrl += id;
            return $sce.trustAsResourceUrl(baseUrl);
        }
    }
})();