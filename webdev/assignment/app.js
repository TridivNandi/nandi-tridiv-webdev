/**
 * Created by Tridiv on 27-02-2017.
 */

module.exports = function (app) {
    console.log("I am inside server");
    require("./services/user.service.server")(app);
    require("./services/website.service.server")(app);
    require("./services/page.service.server")(app);
    require("./services/widget.service.server")(app);
}