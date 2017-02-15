(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];
        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "findAllWidgets": findAllWidgets
        };
        return api;

        function createWidget(pageId, widget){
            var newWidget = angular.copy(widget);
            newWidget.pageId = pageId;
            if(widgets){
                newWidget._id = pages[page.length - 1]._id+1;
            }
            else{
                newWidget._id = 1;
            }
            widgets.push(newWidget);
        }

        function findWidgetsByPageId(pageId){
            var widgetList= []
            for (var w in widgets){
                if(widgets[w].pageId == pageId){
                    widgetList.push(angular.copy(widgets[w]));
                }
            }
            return widgetList;
        }

        function findWidgetById(widgetId){
            for(var w in widgets){
                if(widgets[w]._id == widgetId){
                    return angular.copy(widgets[w]);
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget){

        }

        function deleteWidget(widgetId){
            for (var w in widgets){
                if(widgets[w]._id==widgetId){
                    widgets.splice(w,1);
                    return true;
                }
            }
            return false;
        }

        function findAllWidgets(pageId) {
            return widgets;
        }
    }
})();