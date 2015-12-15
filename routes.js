module.exports = {
    bind: function (app, assetPath) {
        app.get('/*', function (req, res) {
            // remove leading slash and replace hyphens with underscores
            if (req.url.indexOf("?") !== -1) {
                req.url = req.url.substr(0, req.url.indexOf("?"));
            }

            var path = req.url.substr(1).replace(/-/g, '_');

            // remove trailing slash if it exists
            if (path.substr(-1) === '/') {
                path = path.slice(0, -1);
            }

            req.query.assetPath = assetPath;
            req.query.isJoint = (req.query.name || "").toLowerCase() == "joint";
            req.query.isHMRC = (req.query.name || "").toLowerCase() == "hmrc";
            req.query.isCoHo = (req.query.name || "").toLowerCase() == "coho";
            req.query.isCharities = (req.query.name || "").toLowerCase() == "charities";

            // render the template
            res.render(path, req.query);
        });
    }
};
