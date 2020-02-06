var express = require("express");
var app = express();
var port = 3000;

app.get("/:id", function (req, res) {
    var responseObject = req.params.id;
    res.send("附带路由为：" + responseObject);
});

app.listen(port);

console.log("Example app listening on port " + port + "!");