import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const { MONGODB_URI, DATABASE_NAME } = process.env;

export async function connectToDb(req, res, next) {
  const client = new MongoClient(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  await client.connect();
  req.dbClient = client;
  req.db = client.db(DATABASE_NAME);
  next();
}

export async function disconnectFromDb(req, res, next) {
  await req.dbClient.close();
}
