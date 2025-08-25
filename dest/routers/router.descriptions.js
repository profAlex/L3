"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewDriver = exports.getDriverById = exports.getDriversList = void 0;
const http_statuses_1 = require("../core/http-statuses");
// import {Driver, DriverStatus} from "../drivers/driver-types";
const drivers_repository_1 = require("../repositories/drivers.repository");
const getDriversList = (req, res) => {
    res.status(200).json(drivers_repository_1.driversRepository.findALl());
};
exports.getDriversList = getDriversList;
const getDriverById = (req, res) => {
    const driver = drivers_repository_1.driversRepository.findById(+req.params.id);
    if (!driver) {
        res.status(404).send({ message: "Driver not found" });
        return;
    }
    res.status(http_statuses_1.HttpStatus.Ok).send(driver);
};
exports.getDriverById = getDriverById;
const createNewDriver = (req, res) => {
    // const errors: ValidationErrorType[] = driverInputDtoValidation(req.body);
    // if(errors.length > 0) {
    //     res.status(HttpStatus.BadRequest).send({ errors: errors });
    //     return;
    // }
    const newDriver = drivers_repository_1.driversRepository.createDriver(req.body);
    res.status(201).send(newDriver);
};
exports.createNewDriver = createNewDriver;
