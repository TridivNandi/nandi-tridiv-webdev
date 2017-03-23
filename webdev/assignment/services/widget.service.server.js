module.exports = function(app, widgetModel){

    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.post("/api/page/:pageId/widget", createWidget);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/page/:pageId/widget", reorderWidget);


    var multer = require('multer');

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + "/../../public/uploads")
        },
        filename: function (req, file, cb) {
            var extArray = file.mimetype.split("/");
            var extension = extArray[extArray.length - 1];
            cb(null, 'widget_image_' + Date.now() + '.' + extension)
        }
    });
    var upload = multer({storage: storage});
    app.post("/api/upload", upload.single('myFile'), uploadImage);


    function uploadImage(req, res) {

        if (req.file) {

            var myFile = req.file;
            var width = req.body.width;
            var websiteId = req.body.websiteId;
            var widgetId = req.body.widgetId;
            var userId = req.body.userId;


            widgetModel
                .findWidgetById(widgetId)
                .then(
                    function (widget) {

                        widget.width = width;
                        widget.url =  req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;
                        var pageId = widget._page;

                        widgetModel
                            .updateWidget(widget._id, widget)
                            .then(
                                function (updatedWidget) {
                                    res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
                                },
                                function (updateFailure) {
                                    res.sendStatus(400).send(updateFailure);
                                }
                            );
                    },
                    function (error) {
                        res.sendStatus(400).send(error);
                    }
                );


        }
    }


    function reorderWidget(req, res) {
        var pageId = req.params.pageId;
        var start = parseInt(req.query.initial);
        var end = parseInt(req.query.final);
        widgetModel
            .reorderWidget(pageId, start, end)
            .then(function (widget) {
                res.json(widget);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function createWidget(req,res){

        console.log("Server service");
        var pageId = req.params.pageId;
        var newWidget = req.body;
        widgetModel
            .createWidget(pageId, newWidget)
            .then(function (widget) {
                res.json(widget);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function updateWidget(req, res){

        var widget = req.body;
        var widgetId = req.params.widgetId;
        widgetModel
            .updateWidget(widgetId, widget)
            .then(function (widget) {
                res.json(widget);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function deleteWidget(req, res){

        var widgetId = req.params.widgetId;
        widgetModel
            .deleteWidget(widgetId)
            .then(function (widget) {
                res.json(widget);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findWidgetById(req, res){

        var widgetId = req.params.widgetId;
        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                res.json(widget);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findAllWidgetsForPage(req, res) {

        var pId = req.params.pageId;
        widgetModel
            .findAllWidgetsForPage(pId)
            .then(function (widgets) {
                res.json(widgets);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }
}