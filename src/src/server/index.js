"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = __importStar(require("body-parser"));
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const path = __importStar(require("path"));
const webpush = __importStar(require("web-push"));
const app = (0, express_1.default)();
const port = parseInt(process.env["PORT"] || "8080");
const publicVapidKey = "BK9WyTntubhYmSo5dlE6mlJW06XiPtZrZa5EdGLUyLp1RA8AHj8Q3sqlPmQOC7WpKtxhVxW9BBH0z4FXqUU7hsQ";
const privateVapidKey = "bYcComPFP5EAfx72uq2SJiSpdXzobMmqy8xARBR-aT4";
webpush.setVapidDetails("mailto:adammauger@outlook.com", publicVapidKey, privateVapidKey);
// ajm: -------------------------------------------------------------------------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express_1.default.static(__dirname));
app.get("/", (request, response) => {
    console.info(`app.use(/, ${request.path})`);
    response.sendFile(path.join(__dirname, "./index.html"));
});
app.post("/subscribe", (request, response) => {
    console.info(`app.post(/subscribe, ${request.path})`);
    const payload = JSON.stringify({ payload: request.body.payload, title: "Sunstealer Push Notification" });
    const subscription = request.body.subscription;
    response.status(201).json({});
    webpush.sendNotification(subscription, payload).catch((error) => console.error(error));
});
app.use("/oidc", (request, response) => {
    console.info(`app.use(/oidc, ${request.path})`);
    response.sendFile(path.join(__dirname, "./index.html"));
});
app.use("/signout", (request, response) => {
    console.info(`app.use(/signout, ${request.path})`);
    response.clearCookie("idsrv");
    response.clearCookie("idsrv.session");
    response.clearCookie("_session");
    response.clearCookie("_session.sig");
    response.clearCookie("_session.legacy");
    response.clearCookie("_session.legacy.sig");
    response.sendFile(path.join(__dirname, "./index.html"));
});
app.get(/.*/, (request, response) => {
    console.info(`app.use(*, ${request.path})`);
    response.sendFile(path.join(__dirname, "./index.html"));
});
const server = http.createServer(app).listen(port, () => {
    console.info(`sunstealer: http://0.0.0.0:${port}`);
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
//# sourceMappingURL=index.js.map