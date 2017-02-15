/**
 * Created by Tridiv on 15-02-2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController",widgetEditController);

    function widgetEditController(WidgetService,$sce,$routeParams){

        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;
        var widgetId = $routeParams.wgid;
        var widgets = WidgetService.findAllWidgets(pageId);
        var presentWidget = WidgetService.findWidgetById(widgetId);
        var vm = this;

        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pageId = pageId;
        vm.widgets= widgets;
        vm.presentWidget = presentWidget;
        console.log(presentWidget);

        //event handlers

    }
})();
