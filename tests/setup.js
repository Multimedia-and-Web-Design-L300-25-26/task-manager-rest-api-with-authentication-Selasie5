import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });
process.env.JWT_SECRET = process.env.JWT_SECRET || "testsecret";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (const collection of collections) await collection.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});
