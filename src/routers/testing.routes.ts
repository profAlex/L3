import {Router} from "express";
import {Request, Response} from "express";
import {driversRepository} from "../repositories/drivers.repository";
// import {driversDb} from "../db/mock-data";

export const testingRouter = Router();

testingRouter.delete('/all-data', (req: Request, res: Response) => {

    driversRepository.deleteAllDrivers();
    res.sendStatus(204);

});