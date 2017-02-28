/**
 * Created by Tridiv on 27-02-2017.
 */
module.exports = function (app) {
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);
    app.post("/api/website/:websiteId/page", createPage);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    function findAllPagesForWebsite(req, res){

        var pageList= [];
        var websiteId= req.params.websiteId;
        for(var p in pages){
            if(pages[p].websiteId == websiteId){
                pageList.push(pages[p]);
            }
        }
        res.json(pageList);


    }

    function findPageById(req, res){

        var pageId = req.params.pageId;
        for(var p in pages){
            if(pages[p]._id == pageId){
                res.json(pages[p]);
                return;
            }
        }


    }

    function updatePage(req, res){

        var pageId = req.params.pageId;
        var page = req.body;
        for(var p in pages){
            if(pages[p]._id == pageId){
                pages[p].name = page.name;
                pages[p].description = page.description;
                res.json(pages[p]);
                return;
            }
        }




    }

    function deletePage(req, res){

        var pageId = req.params.pageId;
        for(var p in pages){
            if(pages[p]._id == pageId){
                pages.splice(p,1);
                res.json(p);
                return;
            }
        }


    }

    function createPage(req, res){

        var page = req.body;
        var websiteId = req.params.websiteId;
        page.websiteId = websiteId;
        if(pages){
            page._id = pages[pages.length-1]._id + 1;
        }
        else{
            page._id = 1;
        }
        pages.push(page);
        res.json(page);
    }


}