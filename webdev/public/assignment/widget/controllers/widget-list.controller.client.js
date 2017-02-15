(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController",widgetListController);

    function widgetListController(WidgetService,$sce,$routeParams){

        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;
        var widgets = WidgetService.findAllWidgets(pageId);
       // var presentWidget = WidgetService.findWidgetById();
        var vm = this;

        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pageId = pageId;
        vm.widgets= widgets;

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