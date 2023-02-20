"use strict";
exports.__esModule = true;
var bodyParser = require("body-parser");
var express = require("express");
var http = require("http");
var path = require("path");
// import * as webpush from "web-push";
var WebSocket = require("ws");
var app = express();
var port = 8080;
var publicVapidKey = "BK9WyTntubhYmSo5dlE6mlJW06XiPtZrZa5EdGLUyLp1RA8AHj8Q3sqlPmQOC7WpKtxhVxW9BBH0z4FXqUU7hsQ";
var privateVapidKey = "bYcComPFP5EAfx72uq2SJiSpdXzobMmqy8xARBR-aT4";
// webpush.setVapidDetails("mailto:adammauger@outlook.com", publicVapidKey, privateVapidKey);
// ajm: -------------------------------------------------------------------------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.get("/", function (request, response) {
    console.info("app.use(/, ".concat(request.path, ")"));
    response.sendFile(path.join(__dirname, "./index.html"));
});
/* app.post("/subscribe", (request: express.Request, response: express.Response) => {
  console.info(`app.post(/subscribe, ${request.path})`);
  const payload: string = JSON.stringify({ payload: request.body.payload, title: "Sunstealer Push Notification" });
  const subscription: any = request.body.subscription;
  response.status(201).json({});
  webpush.sendNotification(subscription, payload).catch(error => console.error(error));
});*/
app.use("/oidc", function (request, response) {
    console.info("app.use(/oidc, ".concat(request.path, ")"));
    response.sendFile(path.join(__dirname, "./index.html"));
});
app.use("/signout", function (request, response) {
    console.info("app.use(/signout, ".concat(request.path, ")"));
    response.clearCookie("idsrv");
    response.clearCookie("idsrv.session");
    response.clearCookie("_session");
    response.clearCookie("_session.sig");
    response.clearCookie("_session.legacy");
    response.clearCookie("_session.legacy.sig");
    response.sendFile(path.join(__dirname, "./index.html"));
});
app.get("*", function (request, response) {
    console.info("app.use(*, ".concat(request.path, ")"));
    response.sendFile(path.join(__dirname, "./index.html"));
});
var server = http.createServer(app).listen(port, function () {
    console.info("sunstealer: https://0.0.0.0:".concat(port));
});
// ajm: websocket
var wss = new WebSocket.Server({ server: server });
wss.on("listening", function () {
});
wss.on("connection", function (connection) {
    connection.on("message", function (message) {
    });
    connection.on("close", function () {
    });
});
