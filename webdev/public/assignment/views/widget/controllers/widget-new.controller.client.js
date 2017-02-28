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
            WidgetService
                .findWidgetsByPageId(pageId)
                .success(function(widgets){
                    vm.widgets= widgets;
                });

        }
        init();


        //event handlers
        vm.createWidget = createWidget;


        function createWidget(type) {
            var newWidget = {};
            newWidget.widgetType = type;
            WidgetService
                .createWidget(pageId,newWidget)
                .success(function(widget){
                    if(widget){
                        $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widget._id);
                    }
                    else{
                        vm.error = "Widget not created."
                    }
                });
        }

    }
})();
