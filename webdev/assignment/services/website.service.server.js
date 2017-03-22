/**
 * Created by Tridiv on 27-02-2017.
 */
module.exports = function(app, websiteModel){

    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.post("/api/user/:userId/website", createWebsite);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);


    function findWebsiteById(req,res){

        var wId = req.params.websiteId;
        websiteModel
            .findWebsiteById(wId)
            .then(function (website) {
                res.json(website);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findAllWebsitesForUser(req, res){

        var userId = req.params.userId;
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(function (websites) {
                res.json(websites);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function createWebsite(req, res){

        var newWebsite = req.body;
        var userId = req.params.userId;
        websiteModel
            .createWebsiteForUser(userId, newWebsite)
            .then(function (website) {
                res.json(website);
            }, function (error) {
                res.sendStatus(500).send(error);
            });


    }

    function updateWebsite(req, res){
        var wId = req.params.websiteId;
        var website = req.body;
        websiteModel
            .updateWebsite(wId, website)
            .then(function (website) {
                res.json(website);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }


    function deleteWebsite(req, res){

        var wId = req.params.websiteId;
        websiteModel
            .deleteWebsite(wId)
            .then(function (website) {
                res.json(website);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

}