/**
 * Created by Tridiv on 15-02-2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController",widgetEditController);

    function widgetEditController(WidgetService,$sce,$routeParams, $location){

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
            var presentWidget = WidgetService.findWidgetById(widgetId);
            vm.widgets= widgets;
            vm.presentWidget = presentWidget;
        }
        init();

        //event handlers
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;


        function deleteWidget(){
            console.log("in delete widget");
            var isDeleted = WidgetService.deleteWidget(widgetId);
            if(isDeleted){
                $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");
            }
            else{
                vm.error = "Cannot delete widget.";
            }
        }

        function updateWidget() {
            console.log("in update widget");
            var isUpdated = WidgetService.updateWidget(widgetId,vm.presentWidget);
            if(isUpdated){
                $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");
            }
            else{
                vm.error = "Cannot edit widget.";
            }
        }

    }
})();
