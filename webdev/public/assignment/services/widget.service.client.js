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
            "deleteWidget": deleteWidget,
            "updatePosition": updatePosition
        };
        return api;

        function createWidget(pageId, widget){

            console.log("Client Service");
            return $http.post("/api/page/"+ pageId + "/widget", widget);
        }

        function findWidgetsByPageId(pageId){

            return $http.get("/api/page/"+pageId+ "/widget");
        }

        function findWidgetById(widgetId){

            return $http.get("/api/widget/"+widgetId);
        }

        function updateWidget(widgetId, widget){

            return $http.put("/api/widget/"+widgetId, widget);
        }

        function deleteWidget(widgetId){

            return $http.delete("/api/widget/" + widgetId);
        }

        function updatePosition(initial,final,pageId){

            return $http.put("/page/"+pageId+"/widget?initial="+initial+"&final="+final);
        }


    }
})();