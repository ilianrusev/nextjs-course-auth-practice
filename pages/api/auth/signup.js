import { hashPassword } from "@/lib/auth";
import { connectToDB } from "@/lib/db";

async function handler(req, res) {
  if (req.method === "POST") {
    console.log("in handler POST");
    const { email, password } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({
        message:
          "Invalid input - password should be at least 7 characters long",
      });
      return;
    }

    const client = await connectToDB();

    const db = client.db("auth-demo");

    const hashedPassword = await hashPassword(password);

    const result = await db.collection("users").insertOne({
      email: email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Created user successfully" });
  }
}

export default handler;
