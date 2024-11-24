"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var express = require("express");
var http = require("http");
var path = require("path");
var webpush = require("web-push");
var app = express();
var port = parseInt(process.env["PORT"] || "8080");
var publicVapidKey = "BK9WyTntubhYmSo5dlE6mlJW06XiPtZrZa5EdGLUyLp1RA8AHj8Q3sqlPmQOC7WpKtxhVxW9BBH0z4FXqUU7hsQ";
var privateVapidKey = "bYcComPFP5EAfx72uq2SJiSpdXzobMmqy8xARBR-aT4";
webpush.setVapidDetails("mailto:adammauger@outlook.com", publicVapidKey, privateVapidKey);
// ajm: -------------------------------------------------------------------------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.get("/", function (request, response) {
    console.info("app.use(/, ".concat(request.path, ")"));
    response.sendFile(path.join(__dirname, "./index.html"));
});
app.post("/subscribe", function (request, response) {
    console.info("app.post(/subscribe, ".concat(request.path, ")"));
    var payload = JSON.stringify({ payload: request.body.payload, title: "Sunstealer Push Notification" });
    var subscription = request.body.subscription;
    response.status(201).json({});
    webpush.sendNotification(subscription, payload).catch(function (error) { return console.error(error); });
});
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
/* ajm: const wss: WebSocket.Server<WebSocket> = new WebSocket.Server<WebSocket>({ server });

wss.on("listening", () => {
});

wss.on("connection", (connection) => {
  (connection as any).on("message", (message: any) => {
  });

  (connection as any).on("close", () => {
  });

});*/
