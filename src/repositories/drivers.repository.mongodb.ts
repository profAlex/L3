import {Driver, DriverStatus, VehicleFeature} from "../drivers/driver-types";
import {driverCollection} from "../db/mongo.db";

const __driversDb = {
    drivers: <Driver[]>[
        {
            id: 1,
            name: 'Ivan Rider',
            phoneNumber: '1234567890',
            email: 'ivanrider@email.com',
            status: DriverStatus.OnOrder,
            vehicleMake: 'BMW',
            vehicleModel: 'Cabrio',
            vehicleYear: 2014,
            vehicleLicensePlate: 'R1232JKO',
            vehicleDescription: null,
            vehicleFeatures: [VehicleFeature.ChildSeat, VehicleFeature.PetFriendly],
            createdAt: new Date()
        },
        {
            id: 2,
            name: 'Dima Trader',
            phoneNumber: '9876543210',
            email: 'dimatrader@email.com',
            status: DriverStatus.OnOrder,
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



export const driversRepository = {
    async findALl(): Promise<Driver[]> {

        return await driverCollection.find({}).toArray();
        // return __driversDb.drivers;
    },

    async findById(id: number | null | undefined): Promise<Driver | null | undefined> {
        if (id) {
            //let driver = await driversRepository.findById({id: id});
            return await driverCollection.findOne({id: id}) ?? null;
            // return __driversDb.drivers.find((d) => d.id === id) ?? null;
        }

        return undefined;
    },

    async createDriver(driver: any): Promise<Driver> {
        const docCount = await driverCollection.countDocuments();
        let newID :number = 1;

        if(docCount > 0){

            const lastDoc: Driver[] = await driverCollection
                .find()
                .skip(docCount - 1)
                .limit(1)
                .toArray();

            newID = lastDoc[0].id + 1;
        }

        const newDriver: Driver = {
            ...driver,
            id: newID,
            status: DriverStatus.Online,
            createdAt: new Date(),
        };

        await driverCollection.insertOne(newDriver);

        return newDriver;
    },

    async deleteAllDrivers(): Promise<void> {
        await driverCollection.deleteMany({});
    },

};

