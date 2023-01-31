import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  if (!req.method === "PATCH") {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.statis(401).json({ message: "Not authenticated" });
    return;
  }
}
