"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = void 0;
const express_1 = __importDefault(require("express"));
//import {driverRouter} from "./routers/driver.routes";
// import {testingRouter} from "./routers/testing.routes";
// import {setupSwagger} from "./swagger/setup-swagger";
// import {DRIVERS_PATH, TESTING_PATH} from "./core/router-pathes";
const setupApp = (app) => {
    app.use(express_1.default.json()); // middleware для парсинга JSON в теле запроса
    app.use(DRIVERS_PATH, driverRouter);
    app.use(TESTING_PATH, testingRouter);
    app.get("/", (req, res) => {
        res.status(200).send("Hello my first BACK-END APP!");
    });
    //setupSwagger(app);
    return app;
};
exports.setupApp = setupApp;
