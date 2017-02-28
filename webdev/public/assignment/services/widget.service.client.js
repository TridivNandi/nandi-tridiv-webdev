(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        };
        return api;

        function createWidget(pageId, widget){

            return http.post("/api/page/"+ pageId + "/widget", widget);
            /*widget.pageId = pageId;
            if(widgets){
                widget._id = widgets[widgets.length - 1]._id+1;
            }
            else{
                widget._id = 1;
            }
            widgets.push(widget);
            return widget._id;*/
        }

        function findWidgetsByPageId(pageId){

            return http.get("/api/page/"+pageId+ "/widget");
            /*var widgetList= []
            for (var w in widgets){
                if(widgets[w].pageId == pageId){
                    widgetList.push(angular.copy(widgets[w]));
                }
            }
            return widgetList;*/
        }

        function findWidgetById(widgetId){

            return http.get("/api/widget/"+widgetId);
            /*for(var w in widgets){
                if(widgets[w]._id == widgetId){
                    return angular.copy(widgets[w]);
                }
            }
            return null;*/
        }

        function updateWidget(widgetId, widget){

            return http.put("/api/widget/"+widgetId, widget);
            /*for(var w in widgets){
                if(widgets[w]._id === widgetId){
                    widgets[w] = widget;
                    return true;
                }
            }
            return false;*/

        }

        function deleteWidget(widgetId){

            return http.delete("/api/widget/" + widgetId);
           /* for (var w in widgets){
                if(widgets[w]._id==widgetId){
                    widgets.splice(w,1);
                    return true;
                }
            }
            return false;*/
        }


    }
})();