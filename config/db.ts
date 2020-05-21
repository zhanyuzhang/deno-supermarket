import { init, MongoClient } from "../deps.ts";

// Initialize the plugin
await init();

class Database {
  public client: MongoClient;
  constructor(public dbName: string, public url: string) {
    this.dbName = dbName;
    this.url = url;
    this.client = {} as MongoClient;
  }
  connect() {
    const client = new MongoClient();
    client.connectWithUri(this.url);
    this.client = client;
  }
  
  get getDatabase() {
  return this.client.database(this.dbName);
  }
}

const dbName = "deno_supermarket";
const dbHostUrl = "mongodb://localhost:27017";
const db = new Database(dbName, dbHostUrl);
db.connect();

export default db;