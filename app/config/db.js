const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const name = process.env.DB_NAME;
const password = process.env.DB_PASS;

const uri = `mongodb+srv://${name}:${password}@cluster0.40hja.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}

module.exports = { client, connectDB };
