/**
 * Created by Tridiv on 15-02-2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController",widgetNewController);

    function widgetNewController(WidgetService,$sce,$routeParams, $location){

        var vm = this;

        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;
        var widgetId = $routeParams.wgid;

        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pageId = pageId;
        vm.widgetId = widgetId;

        function init() {
            var widgets = WidgetService.findWidgetsByPageId(pageId);
            vm.widgets= widgets;
        }
        init();


        //event handlers
        vm.createWidget = createWidget;


        function createWidget(type) {
            var newWidget = {};
            newWidget.widgetType = type;
            var wid = WidgetService.createWidget(pageId,newWidget);
            $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+wid);


        }

    }
})();
