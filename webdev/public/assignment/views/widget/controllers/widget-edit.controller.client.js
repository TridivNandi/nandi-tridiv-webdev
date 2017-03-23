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

            WidgetService
                .findWidgetsByPageId(pageId)
                .success(function(widgets){
                    vm.widgets= widgets;
                })
            WidgetService
                .findWidgetById(widgetId)
                .success(function(presentWidget){
                    vm.presentWidget = presentWidget;
                });


        }
        init();

        //event handlers
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;


        function deleteWidget(){

            WidgetService
                .deleteWidget(widgetId)
                .success(function(isDeleted){
                    if(isDeleted){
                        $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");
                    }
                    else{
                        vm.error = "Cannot delete widget.";
                    }
                });

        }

        function updateWidget() {

            WidgetService
                .updateWidget(widgetId,vm.presentWidget)
                .success(function(isUpdated){
                    if(isUpdated){
                        $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");
                    }
                    else{
                        vm.error = "Cannot edit widget.";
                    }
                });

        }

    }
})();
