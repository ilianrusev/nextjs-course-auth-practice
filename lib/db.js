import { MongoClient } from "mongodb";

export async function connectToDB() {
  const client = await MongoClient.connect(
    "mongodb+srv://ilian:COdZzKkBqJyYVlLY@cluster0.q7rl6vu.mongodb.net/?retryWrites=true&w=majority"
  );

  return client;
}
