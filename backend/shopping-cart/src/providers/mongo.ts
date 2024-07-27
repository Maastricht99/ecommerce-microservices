import { MongoClient } from "mongodb";
import { config } from "../config";

function loadMongo() {
    const { mongo: { host, port, user, password, database } } = config;
    const connectionUrl = `mongodb://${user}:${password}@${host}:${port}/${database}`;
    return new MongoClient(connectionUrl);
}

export const mongo = loadMongo();