"use strict";
exports.__esModule = true;
var express_1 = require("express");
var cors_1 = require("cors");
var app = express_1["default"]();
app.use(express_1["default"].json());
app.use(cors_1["default"]());
app.listen(3003, function () {
    //eslint-disable-next-line no-console
    console.log("Server is running at port 3003");
});
