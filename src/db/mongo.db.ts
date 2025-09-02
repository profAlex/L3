import {Collection, Db, MongoClient} from "mongodb";
import {Driver} from "../drivers/driver-types";


const DRIVER_COLLECTION_NAME = 'drivers';
const DB_NAME = 'drivers_db';

export let client: MongoClient;
export let driverCollection: Collection<Driver>;

export async function runDB(uri: string) {
    client = new MongoClient(uri);
    const db: Db = client.db(DB_NAME);
    driverCollection = db.collection<Driver>(DRIVER_COLLECTION_NAME);

    try {
        await client.connect();
        await db.command({ping: 1});
        console.log(`Connected to DB ${DB_NAME}`);
    }
    catch (error) {
        await client.close();
        throw new Error(`Database not connected: ${error}`);
    }
}