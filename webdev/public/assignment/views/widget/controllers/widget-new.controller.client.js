/**
 * Created by Tridiv on 15-02-2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController",widgetNewController);

    function widgetNewController(WidgetService,$sce,$routeParams, $location){

        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;
        var widgetId = $routeParams.wgid;
        var widgets = WidgetService.findWidgetsByPageId(pageId);
        //var presentWidget = WidgetService.findWidgetById(widgetId);
        var vm = this;

        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pageId = pageId;
        vm.widgets= widgets;
        //vm.presentWidget = presentWidget;
        vm.widgetId = widgetId;
        //console.log(presentWidget);

        //event handlers
        vm.createWidget = createWidget;


        function createWidget(type) {
            console.log("in create widget");
            var wid = WidgetService.createWidget(pageId,type);
            $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+wid);


        }

    }
})();
