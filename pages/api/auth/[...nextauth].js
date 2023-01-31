import { verifyPassword } from "@/lib/auth";
import { connectToDB } from "@/lib/db";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectToDB();

        const usersCollection = client.db("auth-demo").collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error("No user found");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Could not login");
        }

        client.close();

        return {
          email: user.email,
        };
      },
    }),
  ],
});
