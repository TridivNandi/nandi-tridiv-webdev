module.exports = function(app){

    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.post("/api/page/:pageId/widget", createWidget);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" }
    ];

    function createWidget(req,res){

        var widget = req.body;
        widget.pageId = req.params.pageId;
        if(widgets){
            widget._id = widgets[widgets.length - 1]._id+1;
        }
        else{
            widget._id = 1;
        }
        widgets.push(widget);
        res.json(widget);
    }

    function updateWidget(req, res){

        var widget = req.body;
        var widgetId = req.params.widgetId;
        for(var w in widgets){
            if(widgets[w]._id == widgetId){
                widgets[w] = widget;
                res.json(widget);
                return;
            }
        }
    }

    function deleteWidget(req, res){

        var widgetId = req.params.widgetId;
        for(var w in widgets){
            if(widgets[w]._id == widgetId ){
                widgets.splice(w,1);
                res.json(w);
                return;
            }
        }
    }

    function findWidgetById(req, res){

        var widgetId = req.params.widgetId;
        for(var w in widgets){
            if(widgets[w]._id == widgetId){
                res.json(widgets[w]);
                return;
            }
        }
    }

    function findAllWidgetsForPage(req, res){

        var pageId = req.params.pageId;
        var widgetList = [];
        for(var w in widgets){
            if(widgets[w].pageId ==pageId){
                widgetList.push(widgets[w]);
            }
        }
        res.json(widgetList);
    }
}