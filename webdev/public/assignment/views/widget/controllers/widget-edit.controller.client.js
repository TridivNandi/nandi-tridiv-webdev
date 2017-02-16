/**
 * Created by Tridiv on 15-02-2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController",widgetEditController);

    function widgetEditController(WidgetService,$sce,$routeParams, $location){

        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;
        var widgetId = $routeParams.wgid;
        var widgets = WidgetService.findWidgetsByPageId(pageId);
        var presentWidget = WidgetService.findWidgetById(widgetId);
        var vm = this;

        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pageId = pageId;
        vm.widgets= widgets;
        vm.presentWidget = presentWidget;
        vm.widgetId = widgetId;
        //console.log(presentWidget);

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
            var isUpdated = WidgetService.updateWidget(widgetId,presentWidget);
            if(isUpdated){
                $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");
            }
            else{
                vm.error = "Cannot edit widget.";
            }
        }

    }
})();
