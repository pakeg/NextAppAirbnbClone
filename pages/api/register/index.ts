import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, name, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    try {
      const user = await prisma.user.create({
        data: {
          email,
          name,
          hashedPassword,
        },
      });

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Failed to create user" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
