"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.driversRepository = void 0;
const driver_types_1 = require("../drivers/driver-types");
const mongo_db_1 = require("../db/mongo.db");
const __driversDb = {
    drivers: [
        {
            id: 1,
            name: 'Ivan Rider',
            phoneNumber: '1234567890',
            email: 'ivanrider@email.com',
            status: driver_types_1.DriverStatus.OnOrder,
            vehicleMake: 'BMW',
            vehicleModel: 'Cabrio',
            vehicleYear: 2014,
            vehicleLicensePlate: 'R1232JKO',
            vehicleDescription: null,
            vehicleFeatures: [driver_types_1.VehicleFeature.ChildSeat, driver_types_1.VehicleFeature.PetFriendly],
            createdAt: new Date()
        },
        {
            id: 2,
            name: 'Dima Trader',
            phoneNumber: '9876543210',
            email: 'dimatrader@email.com',
            status: driver_types_1.DriverStatus.OnOrder,
            vehicleMake: 'BMW',
            vehicleModel: 'Cabrio',
            vehicleYear: 2018,
            vehicleLicensePlate: 'K5634BOT',
            vehicleDescription: null,
            vehicleFeatures: [],
            createdAt: new Date()
        }
    ]
};
exports.driversRepository = {
    async findALl() {
        return await mongo_db_1.driverCollection.find({}).toArray();
        // return __driversDb.drivers;
    },
    async findById(id) {
        if (id) {
            //let driver = await driversRepository.findById({id: id});
            return await mongo_db_1.driverCollection.findOne({ id: id }) ?? null;
            // return __driversDb.drivers.find((d) => d.id === id) ?? null;
        }
        return undefined;
    },
    async createDriver(driver) {
        const docCount = await mongo_db_1.driverCollection.countDocuments();
        let newID = 1;
        if (docCount > 0) {
            const lastDoc = await mongo_db_1.driverCollection
                .find()
                .skip(docCount - 1)
                .limit(1)
                .toArray();
            newID = lastDoc[0].id + 1;
        }
        const newDriver = {
            ...driver,
            id: newID,
            status: driver_types_1.DriverStatus.Online,
            createdAt: new Date(),
        };
        await mongo_db_1.driverCollection.insertOne(newDriver);
        return newDriver;
    },
    async deleteAllDrivers() {
        await mongo_db_1.driverCollection.deleteMany({});
    },
};
