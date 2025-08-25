import {Request, Response} from "express";
// import {driversDb} from "../db/mock-data";
import {ValidationErrorType} from "../core/validation-error";
import {driverInputDtoValidation} from "../validation/driver-dto-validation_middleware";
import {HttpStatus} from "../core/http-statuses";
// import {Driver, DriverStatus} from "../drivers/driver-types";
import {driversRepository} from "../repositories/drivers.repository";


export const getDriversList = (req: Request, res: Response) => {
    res.status(200).json(driversRepository.findALl());
};

export const getDriverById = (req: Request, res: Response) => {
    const driver = driversRepository.findById(+req.params.id);

    if(!driver) {
        res.status(404).send({ message: "Driver not found" });
        return;
    }

    res.status(HttpStatus.Ok).send(driver);
};

export const createNewDriver = (req: Request, res: Response) => {
    // const errors: ValidationErrorType[] = driverInputDtoValidation(req.body);

    // if(errors.length > 0) {
    //     res.status(HttpStatus.BadRequest).send({ errors: errors });
    //     return;
    // }

    const newDriver = driversRepository.createDriver(req.body);

    res.status(201).send(newDriver);
};